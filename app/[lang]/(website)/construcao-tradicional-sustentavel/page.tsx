import { ConstrucaoCtsDualShowcase } from '@/components/construcao-cts-dual-showcase';
import { ConstrucaoCtsIntro } from '@/components/construcao-cts-intro';
import { ConstrucaoCtsWhyChoose } from '@/components/construcao-cts-why-choose';
import { ConstrucaoOds } from '@/components/construcao-ods';
import { ConstrucaoSustainability } from '@/components/construcao-sustainability';
import { CtaBanner } from '@/components/cta-banner';
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80";

export const CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_ALT =
  "Alvenaria e acabamentos em obra, representativa de construção tradicional com enfoque sustentável.";

const PAGE_DESCRIPTION =
  "Construção Alvenaria com materiais e práticas orientadas para a sustentabilidade — conforto, durabilidade e menor impacto ambiental.";

export const metadata: Metadata = {
  title: "Construção Alvenaria Sustentável",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Construção Alvenaria Sustentável",
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
    title: "Construção Alvenaria Sustentável",
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
        titleLines={["CONSTRUÇÃO", "ALVENARIA SUSTENTÁVEL"]}
      />
      <ConstrucaoCtsIntro />
      <ConstrucaoCtsWhyChoose />
      <ConstrucaoCtsDualShowcase />
      <CtaBanner
        buttonLabel="Começar"
        dialogTitle="Pedir orçamento para Construção Alvenaria"
        title="Pedir orçamento para Construção Alvenaria"
      />
      <ConstrucaoSustainability />
      <ConstrucaoOds />
    </main>
  );
}
