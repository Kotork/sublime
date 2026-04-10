import { createClient } from "@/lib/supabase/server";
import { LexicalRenderer } from "@/components/blog/lexical-renderer";
import { CtaBannerAlt } from "@/components/cta-banner-alt";
import type { Locale } from "@/lib/i18n/locale";
import { isValidLocale } from "@/lib/i18n/locale";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
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
  const { lang: langParam, slug } = await params;
  if (!isValidLocale(langParam)) {
    notFound();
  }
  const lang = langParam as Locale;

  const post = await getPost(lang, slug);

  if (!post) {
    notFound();
  }

  const backLabel = lang === "pt" ? "← Voltar às notícias" : "← Back to news";

  return (
    <main className="flex w-full flex-1 flex-col">
      <article className="w-full bg-background">
        <div
          className={cn(
            "mx-auto w-full px-4 py-12 sm:px-5 md:py-16 lg:py-20",
            WEBSITE_CONTENT_COLUMN_CLASS
          )}
        >
          <div className="mx-auto max-w-3xl">
            <nav aria-label={lang === "pt" ? "Navegação da notícia" : "Article"}>
              <Link
                className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                href={`/${lang}/noticias`}
              >
                {backLabel}
              </Link>
            </nav>

            <header className="mb-8 md:mb-10">
              {post.published_at && (
                <time
                  className="mb-2 block text-xs text-muted-foreground md:text-sm"
                  dateTime={post.published_at}
                >
                  {new Date(post.published_at).toLocaleDateString(lang, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <h1 className="text-pretty text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {post.excerpt}
                </p>
              )}
              {post.main_image_url && (
                <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl bg-muted">
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
            </header>

            <LexicalRenderer content={post.body} />
          </div>
        </div>
      </article>

      <CtaBannerAlt
        buttonLabel="Peça o seu orçamento"
        dialogTitle="Pedido de orçamento"
        title="Vai construir ou remodelar casa?"
      />
    </main>
  );
}
