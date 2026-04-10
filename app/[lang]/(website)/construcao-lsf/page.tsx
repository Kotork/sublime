import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const CONSTRUCAO_LSF_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80";

export const CONSTRUCAO_LSF_HERO_IMAGE_ALT =
  "Estrutura metálica de perfis leves em obra, ilustrativa de construção em LSF (Light Steel Frame).";

const PAGE_DESCRIPTION =
  "Soluções em Light Steel Frame (LSF) para construção civil eficiente e sustentável — estruturas leves, precisas e adaptadas ao seu projeto.";

export const metadata: Metadata = {
  title: "Construção em LSF",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Construção em LSF",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: CONSTRUCAO_LSF_HERO_IMAGE_SRC,
        width: 1920,
        height: 1280,
        alt: CONSTRUCAO_LSF_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construção em LSF",
    description: PAGE_DESCRIPTION,
    images: [CONSTRUCAO_LSF_HERO_IMAGE_SRC],
  },
};

export default function ConstrucaoLsfPage() {
  return (
    <main>
      <WebsiteSplitPageHero
        eyebrow="SERVIÇOS /"
        headingId="construcao-lsf-hero-heading"
        imageAlt={CONSTRUCAO_LSF_HERO_IMAGE_ALT}
        imageSrc={CONSTRUCAO_LSF_HERO_IMAGE_SRC}
        titleLines={["CONSTRUÇÃO", "EM LSF"]}
      />
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Conteúdo da página em breve.
        </p>
      </div>
    </main>
  );
}
