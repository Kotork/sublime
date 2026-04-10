import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const PARCEIROS_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80";

export const PARCEIROS_HERO_IMAGE_ALT =
  "Edifícios e ambiente urbano, evocando parcerias e relações de confiança na construção sustentável.";

const PAGE_DESCRIPTION =
  "Conheça as organizações e marcas parceiras da SublimePT — relações de confiança na construção sustentável.";

export const metadata: Metadata = {
  title: "Parceiros",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Parceiros",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: PARCEIROS_HERO_IMAGE_SRC,
        width: 1920,
        height: 1280,
        alt: PARCEIROS_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parceiros",
    description: PAGE_DESCRIPTION,
    images: [PARCEIROS_HERO_IMAGE_SRC],
  },
};

export default function ParceirosPage() {
  return (
    <main>
      <WebsiteSplitPageHero
        eyebrow="PARCEIROS /"
        headingId="parceiros-hero-heading"
        imageAlt={PARCEIROS_HERO_IMAGE_ALT}
        imageSrc={PARCEIROS_HERO_IMAGE_SRC}
        titleLines={["RELAÇÕES", "DE CONFIANÇA"]}
      />
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Conteúdo da página em breve.
        </p>
      </div>
    </main>
  );
}
