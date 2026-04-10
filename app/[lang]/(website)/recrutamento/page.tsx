import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const RECRUTAMENTO_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80";

export const RECRUTAMENTO_HERO_IMAGE_ALT =
  "Equipa e estruturas em obra, evocando carreiras na construção sustentável.";

const PAGE_DESCRIPTION =
  "Oportunidades de carreira e recrutamento na SublimePT — trabalhe connosco na construção sustentável.";

export const metadata: Metadata = {
  title: "Recrutamento",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Recrutamento",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: RECRUTAMENTO_HERO_IMAGE_SRC,
        width: 1920,
        height: 1280,
        alt: RECRUTAMENTO_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recrutamento",
    description: PAGE_DESCRIPTION,
    images: [RECRUTAMENTO_HERO_IMAGE_SRC],
  },
};

export default function RecrutamentoPage() {
  return (
    <main>
      <WebsiteSplitPageHero
        eyebrow="RECRUTAMENTO /"
        headingId="recrutamento-hero-heading"
        imageAlt={RECRUTAMENTO_HERO_IMAGE_ALT}
        imageSrc={RECRUTAMENTO_HERO_IMAGE_SRC}
        titleLines={["TRABALHE", "CONNOSCO"]}
      />
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Conteúdo da página em breve.
        </p>
      </div>
    </main>
  );
}
