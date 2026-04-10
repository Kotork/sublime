import { createClient } from "@/lib/supabase/server";
import { LexicalRenderer } from "@/components/blog/lexical-renderer";
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
    return { title: "Notícia não encontrada" };
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
      canonical: `/${lang}/noticias/${slug}`,
    },
  };
}

export default async function NoticiaPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;
  const post = await getPost(lang, slug);

  if (!post) {
    notFound();
  }

  const backLabel = lang === "pt" ? "← Voltar às notícias" : "← Back to news";

  return (
    <article className="mx-auto max-w-3xl py-8">
      <div className="mb-8">
        <Link
          href={`/${lang}/noticias`}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {backLabel}
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">{post.title}</h1>
        {post.main_image_url && (
          <div className="relative mb-6 aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-muted">
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
        {post.published_at && (
          <div className="text-sm text-muted-foreground">
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString(lang as Locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        )}
      </header>

      <LexicalRenderer content={post.body} />
    </article>
  );
}
