import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import Image from "next/image";
import Link from "next/link";

type PostTagRow = {
  tags: { name: string | null; slug: string | null } | null;
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  main_image_url: string | null;
  published_at: string | null;
  blog_post_tags: PostTagRow[] | null;
};

function getFirstTagLabel(post: Post): string | null {
  const rows = post.blog_post_tags;
  if (!rows || rows.length === 0) {
    return null;
  }
  const first = rows.find((row) => {
    const t = row.tags;
    return Boolean(t && (t.name?.trim() || t.slug?.trim()));
  });
  const tag = first?.tags;
  if (!tag) {
    return null;
  }
  const label = (tag.name?.trim() || tag.slug?.trim()) ?? null;
  return label ? label.toUpperCase() : null;
}

type HomeNewsIntroProps = {
  lang: Locale;
};

export async function HomeNewsIntro({ lang }: HomeNewsIntroProps) {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select(
      `id, slug, title, excerpt, main_image_url, published_at,
       blog_post_tags ( tags ( name, slug ) )`
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3)
    .returns<Post[]>();

  const listHref = `/${lang}/noticias`;

  const eyebrowLabel = "Artigos & Notícias";
  const headingText = "Conhecimento que constrói melhores decisões.";
  const subtitleText =
    "Artigos sobre construção sustentável, sistemas construtivos e tudo o que precisa de saber antes de construir ou remodelar.";
  const emptyMessage = "Ainda não há notícias publicadas.";
  const viewAllLabel = "Ver todas as notícias";
  const readMoreLabel = "Continuar a ler";
  const excerptFallback =
    "Breve descrição disponível na página da notícia.";

  return (
    <section
      aria-labelledby="home-news-heading"
      className="w-full bg-background"
      id="noticias"
    >
      <div
        className={cn(
          "mx-auto px-4 pb-16 sm:px-5 md:pb-20 lg:pb-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <header className="mb-10 max-w-3xl md:mb-14">
          <Badge
            className="mb-5 rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
            variant="outline"
          >
            {eyebrowLabel}
          </Badge>
          <h2
            className="text-pretty text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
            id="home-news-heading"
          >
            {headingText}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitleText}
          </p>
        </header>

        {!posts || posts.length === 0 ? (
          <p className="text-muted-foreground">{emptyMessage}</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[4fr_3fr_3fr] lg:grid-rows-[1fr_auto] lg:gap-8">
            {posts.map((post, index) => {
              const postHref = `/${lang}/noticias/${post.slug}`;
              const tagLabel = getFirstTagLabel(post);
              const excerptText = post.excerpt?.trim() || excerptFallback;
              const isFeatured = index === 0;

              return (
                <li
                  className={cn("flex", isFeatured && "lg:row-span-2")}
                  key={post.id}
                >
                  <Card
                    className={cn(
                      "flex w-full flex-col overflow-hidden rounded-xl border-border bg-card p-0 shadow-sm transition-shadow hover:shadow-md",
                      isFeatured ? "h-full" : "lg:h-4/5"
                    )}
                  >
                    <div
                      className={cn(
                        "relative w-full overflow-hidden bg-muted",
                        isFeatured
                          ? "aspect-16/10 lg:aspect-16/14"
                          : "aspect-16/10 lg:aspect-video"
                      )}
                    >
                      {post.main_image_url ? (
                        <Image
                          alt={`Imagem de capa: ${post.title}`}
                          className="object-cover"
                          fill
                          sizes={
                            isFeatured
                              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                          }
                          src={post.main_image_url}
                        />
                      ) : null}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-br from-[#0f5e7f]/70 via-[#0f5e7f]/45 to-[#1a6b3d]/70"
                      />
                    </div>

                    <div
                      className={cn(
                        "flex flex-col",
                        isFeatured
                          ? "flex-1 p-6 md:p-7"
                          : "min-h-0 flex-1 p-6 md:p-7 lg:p-5"
                      )}
                    >
                      {tagLabel ? (
                        <Badge
                          className="mb-3 self-start rounded-full border-border bg-secondary px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
                          variant="outline"
                        >
                          {tagLabel}
                        </Badge>
                      ) : null}

                      <h3
                        className={cn(
                          "text-pretty font-bold leading-snug tracking-tight text-foreground",
                          isFeatured
                            ? "text-xl md:text-2xl"
                            : "text-lg md:text-xl"
                        )}
                      >
                        <Link
                          className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          href={postHref}
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed text-muted-foreground",
                          isFeatured ? "line-clamp-5" : "line-clamp-3 lg:line-clamp-2"
                        )}
                      >
                        {excerptText}
                      </p>

                      <div
                        className={cn(
                          "mt-auto pt-6",
                          !isFeatured && "lg:pt-4"
                        )}
                      >
                        <Link
                          aria-label={`${readMoreLabel} — ${post.title}`}
                          className="inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          href={postHref}
                        >
                          {readMoreLabel}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}

            <li className="col-span-full mt-4 flex justify-center sm:col-span-2 sm:mt-6 lg:col-span-2 lg:col-start-2 lg:mt-0 lg:items-end lg:self-end lg:pb-2">
              <Link
                className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                href={listHref}
              >
                {viewAllLabel}
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
