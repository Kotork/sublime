import { ConstrucaoIcfComparison } from "@/components/construcao-icf-comparison";
import { ConstrucaoIcfDualShowcase } from "@/components/construcao-icf-dual-showcase";
import { ConstrucaoIcfIntro } from "@/components/construcao-icf-intro";
import { ConstrucaoOds } from '@/components/construcao-ods';
import { ConstrucaoSustainability } from '@/components/construcao-sustainability';
import { CtaBanner } from "@/components/cta-banner";
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const CONSTRUCAO_ICF_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80";

export const CONSTRUCAO_ICF_HERO_IMAGE_ALT =
  "Trabalhos de betão e estrutura em obra, alinhados com sistemas como ICF (Insulated Concrete Forms).";

const PAGE_DESCRIPTION =
  "Construção com formulários de betão isolados (ICF) para conforto térmico, eficiência energética e estruturas duradouras.";

export const metadata: Metadata = {
  title: "Construção em ICF",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Construção em ICF",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: CONSTRUCAO_ICF_HERO_IMAGE_SRC,
        width: 1920,
        height: 1280,
        alt: CONSTRUCAO_ICF_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construção em ICF",
    description: PAGE_DESCRIPTION,
    images: [CONSTRUCAO_ICF_HERO_IMAGE_SRC],
  },
};

export default function ConstrucaoIcfPage() {
  return (
    <main>
      <WebsiteSplitPageHero
        eyebrow="SERVIÇOS /"
        headingId="construcao-icf-hero-heading"
        imageAlt={CONSTRUCAO_ICF_HERO_IMAGE_ALT}
        imageSrc={CONSTRUCAO_ICF_HERO_IMAGE_SRC}
        titleLines={["CONSTRUÇÃO", "EM ICF"]}
      />
      <ConstrucaoIcfIntro />
      <ConstrucaoIcfComparison />
      <ConstrucaoIcfDualShowcase />
      <CtaBanner
        buttonLabel="Começar"
        dialogTitle="Pedir orçamento para Construção em ICF"
        title="Pedir orçamento para Construção em ICF"
      />
      <ConstrucaoSustainability />
      <ConstrucaoOds />
    </main>
  );
}
