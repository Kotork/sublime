import { ConstrucaoCtsApproach } from "@/components/construcao-cts-approach";
import { ConstrucaoCtsCertification } from "@/components/construcao-cts-certification";
import { ConstrucaoCtsComparison } from "@/components/construcao-cts-comparison";
import { ConstrucaoCtsIntro } from "@/components/construcao-cts-intro";
import { ConstrucaoCtsProcessSteps } from "@/components/construcao-cts-process-steps";
import { ConstrucaoCtsRegion } from "@/components/construcao-cts-region";
import { ConstrucaoOds } from "@/components/construcao-ods";
import { ConstrucaoSustainability } from "@/components/construcao-sustainability";
import { CtaBanner } from "@/components/cta-banner";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

export const CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80";

export const CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_ALT =
  "Alvenaria e acabamentos em obra, representativa de construção tradicional com enfoque sustentável.";

const PAGE_TITLE = "Construção Alvenaria Sustentável em Coimbra | SublimePT";

const PAGE_DESCRIPTION =
  "Construção em alvenaria com materiais e práticas orientadas para a sustentabilidade no Distrito de Coimbra — conforto, durabilidade e menor impacto ambiental. Peça orçamento.";

const CONSTRUCAO_CTS_CTA_TITLE =
  "Interessado em construir com alvenaria sustentável?";

const CONSTRUCAO_CTS_CTA_DESCRIPTION =
  "Analisamos o terreno, prazos e requisitos para lhe apresentar a solução mais adequada em construção tradicional sustentável.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
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
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_SRC],
  },
};

export default function ConstrucaoTradicionalSustentavelPage() {
  return (
    <div>
      <WebsiteSplitPageHero
        eyebrow="SERVIÇOS /"
        headingId="construcao-tradicional-sustentavel-hero-heading"
        imageAlt={CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_ALT}
        imageSrc={CONSTRUCAO_TRADICIONAL_SUSTENTAVEL_HERO_IMAGE_SRC}
        titleLines={["CONSTRUÇÃO", "ALVENARIA SUSTENTÁVEL"]}
      />
      <main className="flex flex-1 flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <ConstrucaoCtsIntro />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoCtsComparison />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoCtsApproach />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoCtsProcessSteps />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoCtsCertification />
        </ScrollReveal>

        <ScrollReveal>
          <ConstrucaoCtsRegion />
        </ScrollReveal>

        <ScrollReveal>
          <CtaBanner
            buttonLabel="Peça o seu orçamento gratuito"
            defaultWorkType="Construção Tradicional Sustentável"
            description={CONSTRUCAO_CTS_CTA_DESCRIPTION}
            dialogTitle="Pedido de orçamento — Construção Alvenaria Sustentável"
            title={CONSTRUCAO_CTS_CTA_TITLE}
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
