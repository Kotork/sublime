import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80";

export const CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_ALT =
  "Alvenaria e acabamentos em obra, representativa de construção tradicional com enfoque sustentável.";

const PAGE_DESCRIPTION =
  "Construção tradicional com materiais e práticas orientadas para a sustentabilidade — conforto, durabilidade e menor impacto ambiental.";

export const metadata: Metadata = {
  title: "Construção tradicional sustentável",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Construção tradicional sustentável",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_SRC,
        width: 1920,
        height: 1280,
        alt: CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construção tradicional sustentável",
    description: PAGE_DESCRIPTION,
    images: [CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_SRC],
  },
};

export default function ConstrucaoTradicionalSustentavelPage() {
  return (
    <main>
      <WebsiteSplitPageHero
        eyebrow="SERVIÇOS /"
        headingId="construcao-tradicional-sustentavel-hero-heading"
        imageAlt={CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_ALT}
        imageSrc={CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_SRC}
        titleLines={["CONSTRUÇÃO", "TRADICIONAL SUSTENTÁVEL"]}
      />
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Conteúdo da página em breve.
        </p>
      </div>
    </main>
  );
}
