import { ConstrucaoIcfComparison } from "@/components/construcao-icf-comparison";
import { ConstrucaoIcfApproach } from "@/components/construcao-icf-approach";
import { ConstrucaoIcfCertification } from "@/components/construcao-icf-certification";
import { ConstrucaoIcfRegion } from "@/components/construcao-icf-region";
import { ConstrucaoIcfProcessSteps } from "@/components/construcao-icf-process-steps";
import { ConstrucaoIcfIntro } from "@/components/construcao-icf-intro";
import { ConstrucaoOds } from "@/components/construcao-ods";
import { ConstrucaoSustainability } from "@/components/construcao-sustainability";
import { CtaBanner } from "@/components/cta-banner";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const CONSTRUCAO_ICF_HERO_IMAGE_SRC = "/images/services/icf/icf.png";

export const CONSTRUCAO_ICF_HERO_IMAGE_ALT =
  "Trabalhos de betão e estrutura em obra, alinhados com sistemas como ICF (Insulated Concrete Forms).";

const PAGE_TITLE = "Construção em ICF (Betão Isolado) em Coimbra | SublimePT";

const PAGE_DESCRIPTION =
  "Construção em ICF — cofragem de betão isolado — no Distrito de Coimbra: a robustez do betão armado com isolamento térmico integrado. Peça orçamento.";

const CONSTRUCAO_ICF_CTA_TITLE = "Interessado em construir com ICF?";

const CONSTRUCAO_ICF_CTA_DESCRIPTION =
  "Analisamos o terreno, prazos e requisitos para lhe apresentar a solução mais adequada em betão isolado.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
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
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [CONSTRUCAO_ICF_HERO_IMAGE_SRC],
  },
};

export default function ConstrucaoIcfPage() {
  return (
    <div>
      <WebsiteSplitPageHero
        eyebrow="SERVIÇOS /"
        headingId="construcao-icf-hero-heading"
        imageAlt={CONSTRUCAO_ICF_HERO_IMAGE_ALT}
        imageSrc={CONSTRUCAO_ICF_HERO_IMAGE_SRC}
        titleLines={["CONSTRUÇÃO", "EM ICF"]}
      />

      <main className="flex flex-1 flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <ConstrucaoIcfIntro />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoIcfComparison />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoIcfApproach />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoIcfProcessSteps />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoIcfCertification />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoIcfRegion />
        </ScrollReveal>

        <ScrollReveal>
          <CtaBanner
            buttonLabel="Peça o seu orçamento gratuito"
            defaultWorkType="Construção ICF"
            description={CONSTRUCAO_ICF_CTA_DESCRIPTION}
            dialogTitle="Pedido de orçamento — Construção em ICF"
            title={CONSTRUCAO_ICF_CTA_TITLE}
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
