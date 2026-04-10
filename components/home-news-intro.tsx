import { createClient } from "@/lib/supabase/server";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  main_image_url: string | null;
  published_at: string | null;
};

function formatCardDate(iso: string | null, lang: Locale): string | null {
  if (!iso) {
    return null;
  }
  const d = new Date(iso);
  return d.toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

type HomeNewsIntroProps = {
  lang: Locale;
};

export async function HomeNewsIntro({ lang }: HomeNewsIntroProps) {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, main_image_url, published_at")
    .eq("locale", lang)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3)
    .returns<Post[]>();

  const listHref = `/${lang}/noticias`;
  const emptyMessage =
    lang === "pt"
      ? "Ainda não há notícias publicadas."
      : "No published news yet.";
  const viewAllLabel = lang === "pt" ? "VER NOTÍCIAS" : "VIEW NEWS";
  const readMoreLabel = lang === "pt" ? "LER MAIS" : "READ MORE";

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
        <h2
          className="mb-6 text-left text-lg font-bold uppercase tracking-tight text-foreground md:mb-8 md:text-xl"
          id="home-news-heading"
        >
          04 / NOTÍCIAS
        </h2>

        {!posts || posts.length === 0 ? (
          <p className="text-muted-foreground">{emptyMessage}</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
              {posts.map((post) => {
                const dateLabel = formatCardDate(post.published_at, lang);
                const postHref = `/${lang}/noticias/${post.slug}`;
                const excerptText =
                  post.excerpt?.trim() ||
                  (lang === "pt"
                    ? "Breve descrição disponível na página da notícia."
                    : "Read more on the article page.");

                return (
                  <li key={post.id}>
                    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                      <div className="relative aspect-16/10 w-full shrink-0 bg-muted">
                        {post.main_image_url ? (
                          <Image
                            alt={post.title}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            src={post.main_image_url}
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        {dateLabel && post.published_at ? (
                          <time
                            className="text-xs text-muted-foreground"
                            dateTime={post.published_at}
                          >
                            {dateLabel}
                          </time>
                        ) : null}
                        <h3 className="mt-2 text-base font-bold text-foreground sm:text-lg">
                          <Link
                            className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            href={postHref}
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {excerptText}
                        </p>
                        <Link
                          className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-sm"
                          href={postHref}
                        >
                          <ChevronRight
                            aria-hidden
                            className="size-4 shrink-0"
                            strokeWidth={2}
                          />
                          {readMoreLabel}
                        </Link>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex justify-center md:mt-12">
              <Link
                className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                href={listHref}
              >
                <ChevronRight
                  aria-hidden
                  className="size-4 shrink-0 md:size-4.5"
                  strokeWidth={2}
                />
                {viewAllLabel}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
