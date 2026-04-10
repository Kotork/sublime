import { createClient } from "@/lib/supabase/server";
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Locale } from "@/lib/i18n/locale";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/ui/badge";

export const NOTICIAS_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80";

export const NOTICIAS_HERO_IMAGE_ALT =
  "Ambiente de trabalho com notícias e informação, evocando atualizações e novidades da empresa.";

const PAGE_DESCRIPTION =
  "Últimas notícias e atualizações da SublimePT — fique por dentro das novidades.";

export const metadata: Metadata = {
  title: "Notícias",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Notícias",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: NOTICIAS_HERO_IMAGE_SRC,
        width: 1920,
        height: 1280,
        alt: NOTICIAS_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notícias",
    description: PAGE_DESCRIPTION,
    images: [NOTICIAS_HERO_IMAGE_SRC],
  },
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

export default async function NoticiasIndex({
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

  const hero = (
    <WebsiteSplitPageHero
      eyebrow="NOTÍCIAS /"
      headingId="noticias-hero-heading"
      imageAlt={NOTICIAS_HERO_IMAGE_ALT}
      imageSrc={NOTICIAS_HERO_IMAGE_SRC}
      titleLines={["FIQUE POR DENTRO", "DAS NOVIDADES"]}
    />
  );

  if (!posts || posts.length === 0) {
    return (
      <main>
        {hero}
        <div className="py-20 text-center text-muted-foreground">
          <p>Ainda não há notícias publicadas.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {hero}
      <div className="py-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${lang}/noticias/${post.slug}`}
              className="group block overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20"
            >
              <article>
                {post.main_image_url && (
                  <div className="relative aspect-16/10 w-full bg-muted">
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
                  <h2 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {post.published_at && (
                      <time dateTime={post.published_at}>
                        {new Date(post.published_at).toLocaleDateString(
                          lang as Locale,
                          { year: "numeric", month: "long", day: "numeric" },
                        )}
                      </time>
                    )}
                    {(tagMap[post.id] ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {tagMap[post.id].map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="px-1.5 py-0 text-[10px]"
                          >
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
    </main>
  );
}
