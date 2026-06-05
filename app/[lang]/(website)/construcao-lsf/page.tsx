import { ConstrucaoLsfComparison } from "@/components/construcao-lsf-comparison";
import { ConstrucaoLsfDualShowcase } from "@/components/construcao-lsf-dual-showcase";
import { ConstrucaoLsfIntro } from "@/components/construcao-lsf-intro";
import { ConstrucaoOds } from "@/components/construcao-ods";
import { ConstrucaoSustainability } from "@/components/construcao-sustainability";
import { CtaBanner } from "@/components/cta-banner";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const CONSTRUCAO_LSF_HERO_IMAGE_SRC = "/images/services/lsf/detail1.png";

export const CONSTRUCAO_LSF_HERO_IMAGE_ALT =
  "Estrutura metálica de perfis leves em obra, ilustrativa de construção em LSF (Light Steel Frame).";

const PAGE_DESCRIPTION =
  "Soluções em Light Steel Frame (LSF) para construção civil eficiente e sustentável — estruturas leves, precisas e adaptadas ao seu projeto.";

const CONSTRUCAO_LSF_CTA_TITLE = "Interessado em construir com LSF?";
const CONSTRUCAO_LSF_CTA_DESCRIPTION =
  "Analisamos o terreno, prazos e requisitos para lhe apresentar a solução mais adequada em LSF.";

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
    <div>
      <WebsiteSplitPageHero
        eyebrow="SERVIÇOS /"
        headingId="construcao-lsf-hero-heading"
        imageAlt={CONSTRUCAO_LSF_HERO_IMAGE_ALT}
        imageSrc={CONSTRUCAO_LSF_HERO_IMAGE_SRC}
        titleLines={["CONSTRUÇÃO", "EM LSF"]}
      />
      <main className="flex flex-1 flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <ConstrucaoLsfIntro />
        </ScrollReveal>
        <ScrollReveal>
          <ConstrucaoLsfComparison />
        </ScrollReveal>
        <ScrollReveal>
          <ConstrucaoLsfDualShowcase />
        </ScrollReveal>
        <ScrollReveal>
          <CtaBanner
            buttonLabel="Peça o seu orçamento gratuito"
            defaultWorkType="Construção LSF"
            description={CONSTRUCAO_LSF_CTA_DESCRIPTION}
            dialogTitle="Pedido de orçamento — Construção em LSF"
            title={CONSTRUCAO_LSF_CTA_TITLE}
          />
        </ScrollReveal>
        <ScrollReveal>
          <ConstrucaoSustainability />
        </ScrollReveal>
        <ScrollReveal>
          <ConstrucaoOds />
        </ScrollReveal>
      </main>
    </div>
  );
}
