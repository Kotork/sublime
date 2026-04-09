import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/locale";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest articles and updates.",
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  main_image_url: string | null;
  published_at: string | null;
  locale: string;
};

type PostTag = {
  post_id: string;
  tags: { slug: string } | null;
};

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, main_image_url, published_at, locale")
    .eq("locale", lang)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .returns<Post[]>();

  const postIds = (posts ?? []).map((p) => p.id);
  let tagMap: Record<string, string[]> = {};
  if (postIds.length > 0) {
    const { data: tagRows } = await supabase
      .from("blog_post_tags")
      .select("post_id, tags(slug)")
      .in("post_id", postIds)
      .returns<PostTag[]>();

    tagMap = (tagRows ?? []).reduce<Record<string, string[]>>((acc, row) => {
      const slug = row.tags?.slug;
      if (slug) {
        (acc[row.post_id] ??= []).push(slug);
      }
      return acc;
    }, {});
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <h1 className="text-3xl font-bold mb-4 text-foreground">Blog</h1>
        <p>No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${lang}/blog/${post.slug}`}
            className="group block rounded-xl border bg-card overflow-hidden transition-colors hover:border-foreground/20"
          >
            <article>
              {post.main_image_url && (
                <div className="relative aspect-[16/10] w-full bg-muted">
                  <Image
                    src={post.main_image_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className={post.main_image_url ? "p-6 pt-5" : "p-6"}>
              <h2 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {post.published_at && (
                  <time dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString(
                      lang as Locale,
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </time>
                )}
                {(tagMap[post.id] ?? []).length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {tagMap[post.id].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
