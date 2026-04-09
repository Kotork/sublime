import { createClient } from "@/lib/supabase/server";
import { LexicalRenderer } from "@/components/blog/lexical-renderer";
import { Badge } from "@/ui/badge";
import type { Locale } from "@/lib/i18n/locale";
import type { Metadata } from "next";
import type { SerializedEditorState } from "lexical";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

type Params = { lang: string; slug: string };

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  main_image_url: string | null;
  body: SerializedEditorState;
  published_at: string | null;
  locale: string;
  status: string;
};

type PostTag = {
  tags: { slug: string } | null;
};

async function getPost(lang: string, slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, main_image_url, body, published_at, locale, status",
    )
    .eq("locale", lang)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle<Post>();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(lang, slug);
  if (!post) {
    return { title: "Post not found" };
  }
  const ogImage = post.main_image_url
    ? [{ url: post.main_image_url, alt: post.title }]
    : undefined;

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      locale: lang,
      images: ogImage,
    },
    twitter: {
      card: post.main_image_url ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.main_image_url ? [post.main_image_url] : undefined,
    },
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;
  const post = await getPost(lang, slug);

  if (!post) {
    notFound();
  }

  const supabase = await createClient();
  const { data: tagRows } = await supabase
    .from("blog_post_tags")
    .select("tags(slug)")
    .eq("post_id", post.id)
    .returns<PostTag[]>();

  const tags = (tagRows ?? [])
    .map((r) => r.tags?.slug)
    .filter((s): s is string => Boolean(s));

  return (
    <article className="py-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href={`/${lang}/blog`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to blog
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
        {post.main_image_url && (
          <div className="relative aspect-video w-full max-w-3xl mb-6 rounded-xl overflow-hidden bg-muted">
            <Image
              src={post.main_image_url}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
          {post.published_at && (
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString(lang as Locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      <LexicalRenderer content={post.body} />
    </article>
  );
}
