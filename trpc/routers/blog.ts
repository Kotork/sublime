import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, authenticatedProcedure } from "../init";

const blogPostStatus = z.enum(["draft", "published", "archived"]);

const createSchema = z.object({
  locale: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  main_image_url: z.string().url().optional(),
  body: z.record(z.string(), z.unknown()),
  tags: z.array(z.string()).default([]),
});

const updateSchema = z.object({
  id: z.string().uuid(),
  locale: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  main_image_url: z.string().url().nullable().optional(),
  body: z.record(z.string(), z.unknown()).optional(),
  tags: z.array(z.string()).optional(),
});

const idSchema = z.object({ id: z.string().uuid() });

const listSchema = z.object({
  status: blogPostStatus.optional(),
  locale: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
});

type BlogPostRow = {
  id: string;
  locale: string;
  slug: string;
  title: string;
  excerpt: string | null;
  main_image_url: string | null;
  body: Record<string, unknown>;
  status: string;
  published_at: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
};

type BlogPostListItem = Pick<
  BlogPostRow,
  | "id"
  | "locale"
  | "slug"
  | "title"
  | "excerpt"
  | "main_image_url"
  | "status"
  | "published_at"
  | "created_at"
  | "updated_at"
>;

function normalizeTagSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function syncTags(supabase: any, postId: string, rawTags: string[]) {
  const slugs = rawTags.map(normalizeTagSlug).filter(Boolean);

  await supabase.from("blog_post_tags").delete().eq("post_id", postId);

  if (slugs.length === 0) return;

  const tagRows = slugs.map((slug) => ({ slug, name: slug }));
  const { data: upserted, error: tagErr } = await supabase
    .from("tags")
    .upsert(tagRows, { onConflict: "slug", ignoreDuplicates: false })
    .select("id, slug");
  if (tagErr)
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: tagErr.message });

  const junctionRows = (upserted ?? []).map((t: { id: string }) => ({
    post_id: postId,
    tag_id: t.id,
  }));
  if (junctionRows.length > 0) {
    const { error: junctionErr } = await supabase
      .from("blog_post_tags")
      .insert(junctionRows);
    if (junctionErr)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: junctionErr.message });
  }
}

export const blogRouter = createTRPCRouter({
  list: authenticatedProcedure
    .input(listSchema)
    .query(
      async ({
        ctx,
        input,
      }): Promise<{ items: BlogPostListItem[]; total: number }> => {
        let query = ctx.supabase
          .from("blog_posts")
          .select(
            "id, locale, slug, title, excerpt, main_image_url, status, published_at, created_at, updated_at",
            { count: "exact" },
          )
          .order("updated_at", { ascending: false })
          .range(input.offset, input.offset + input.limit - 1);

        if (input.status) query = query.eq("status", input.status);
        if (input.locale) query = query.eq("locale", input.locale);

        const { data, error, count } = await query;
        if (error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        return { items: (data ?? []) as BlogPostListItem[], total: count ?? 0 };
      },
    ),

  getById: authenticatedProcedure
    .input(idSchema)
    .query(async ({ ctx, input }): Promise<BlogPostRow & { tags: string[] }> => {
      const { data: post, error } = await ctx.supabase
        .from("blog_posts")
        .select("*")
        .eq("id", input.id)
        .maybeSingle();
      if (error)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
      if (!post)
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

      const { data: tagRows } = await ctx.supabase
        .from("blog_post_tags")
        .select("tag_id, tags(slug)")
        .eq("post_id", input.id);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tags = (tagRows ?? [])
        .map((r: any) => {
          const t = r.tags;
          if (Array.isArray(t)) return t[0]?.slug ?? "";
          return t?.slug ?? "";
        })
        .filter(Boolean) as string[];

      return { ...(post as BlogPostRow), tags };
    }),

  create: authenticatedProcedure
    .input(createSchema)
    .mutation(async ({ ctx, input }): Promise<{ id: string }> => {
      const {
        data: { user },
      } = await ctx.supabase.auth.getUser();
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      const { tags, ...postData } = input;

      const { data: post, error } = await ctx.supabase
        .from("blog_posts")
        .insert({
          ...postData,
          slug: normalizeTagSlug(postData.slug),
          author_id: user.id,
        })
        .select("id")
        .single();
      if (error)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });

      await syncTags(ctx.supabase, post.id, tags);

      return { id: post.id as string };
    }),

  update: authenticatedProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const { id, tags, ...fields } = input;

      if (fields.slug) fields.slug = normalizeTagSlug(fields.slug);

      if (Object.keys(fields).length > 0) {
        const { error } = await ctx.supabase
          .from("blog_posts")
          .update(fields)
          .eq("id", id);
        if (error)
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
      }

      if (tags !== undefined) {
        await syncTags(ctx.supabase, id, tags);
      }

      return { ok: true };
    }),

  publish: authenticatedProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const { data: post, error: fetchErr } = await ctx.supabase
        .from("blog_posts")
        .select("published_at")
        .eq("id", input.id)
        .maybeSingle();
      if (fetchErr)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: fetchErr.message,
        });
      if (!post)
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

      const updates: Record<string, unknown> = { status: "published" };
      if (!post.published_at) updates.published_at = new Date().toISOString();

      const { error } = await ctx.supabase
        .from("blog_posts")
        .update(updates)
        .eq("id", input.id);
      if (error)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });

      return { ok: true };
    }),

  archive: authenticatedProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const { error } = await ctx.supabase
        .from("blog_posts")
        .update({ status: "archived" })
        .eq("id", input.id);
      if (error)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
      return { ok: true };
    }),
});
