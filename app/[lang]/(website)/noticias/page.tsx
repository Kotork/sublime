import { createClient } from "@/lib/supabase/server";
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Locale } from "@/lib/i18n/locale";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CenterSection from "@/components/center-section";
import { ChevronRight } from "lucide-react";
import { CtaBannerAlt } from "@/components/cta-banner-alt";

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
      <CenterSection
        srTitle="Na SublimePT, cada projeto conta uma história. Aqui partilhamos novidades, conquistas e evolução contínua num setor em constante transformação."
        description="Na SublimePT, cada projeto conta uma história. Aqui partilhamos novidades, conquistas e evolução contínua num setor em constante transformação."
      />
      <div className="py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const postHref = `/${lang}/noticias/${post.slug}`;
            return (
              <article
                key={post.id}
                className="overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20"
              >
                {post.main_image_url && (
                  <div className="relative aspect-16/10 w-full bg-muted">
                    <Image
                      src={post.main_image_url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className={post.main_image_url ? "p-6 pt-5" : "p-6"}>
                  {post.published_at && (
                    <time
                      className="mb-2 block text-xs text-muted-foreground"
                      dateTime={post.published_at}
                    >
                      {new Date(post.published_at).toLocaleDateString(
                        lang as Locale,
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                  )}
                  <h2 className="mb-2 text-lg font-semibold text-foreground">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    href={postHref}
                  >
                    <ChevronRight
                      aria-hidden
                      className="size-4 shrink-0"
                      strokeWidth={2}
                    />
                    Ler Mais
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <CtaBannerAlt
        buttonLabel="Peça o seu orçamento"
        dialogTitle="Pedido de orçamento"
        title="Vai construir ou remodelar casa?"
      />
    </main>
  );
}
