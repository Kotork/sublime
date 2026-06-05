import { SobreNosCompanyStory } from "@/components/sobre-nos-company-story";
import {
  SobreNosHero,
  SOBRE_NOS_HERO_IMAGE_ALT,
  SOBRE_NOS_HERO_IMAGE_SRC,
} from "@/components/sobre-nos-hero";
import type { Metadata } from "next";
import CenterSection from "../../../../components/center-section";
import { CtaBanner } from "@/components/cta-banner";
import { ImageFull } from "@/components/image-full";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SobreNosDifferentiators } from "@/components/sobre-nos-differentiators";
import { SobreNosMissionVisionValues } from "@/components/sobre-nos-mission-vision-values";
import type { Locale } from "@/lib/i18n/locale";
import { isValidLocale } from "@/lib/i18n/locale";
import { notFound } from "next/navigation";

const PAGE_DESCRIPTION =
  "Conheça a SublimePT: construímos hoje as casas responsáveis de amanhã — construção civil sustentável, moradias e remodelação.";

const SOBRE_NOS_CTA_TITLE = "Vai construir ou remodelar casa?";
const SOBRE_NOS_CTA_DESCRIPTION =
  "Conte-nos o seu projeto e receba um orçamento gratuito e personalizado.";

export const metadata: Metadata = {
  title: "Sobre nós",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Sobre nós",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SOBRE_NOS_HERO_IMAGE_SRC,
        width: 1920,
        height: 1280,
        alt: SOBRE_NOS_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre nós",
    description: PAGE_DESCRIPTION,
    images: [SOBRE_NOS_HERO_IMAGE_SRC],
  },
};

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  if (!isValidLocale(langParam)) {
    notFound();
  }
  const lang = langParam as Locale;

  return (
    <div>
      <SobreNosHero />
      <main className="flex flex-1 flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <CenterSection
            variant="featured"
            srTitle="Compromisso da SublimePT com a construção sustentável"
            description="Construímos o presente com inovação, eficiência e foco no futuro. Desde 2021, a SublimePT afirma-se como uma alternativa moderna na construção civil, aliando sustentabilidade, rapidez e qualidade em cada projeto."
          />
        </ScrollReveal>
        <ScrollReveal>
          <SobreNosCompanyStory />
        </ScrollReveal>
        <ScrollReveal>
          <CenterSection
            variant="featured"
            accentPosition="bottom"
            srTitle="Apostamos em métodos construtivos inovadores"
            description="Apostamos em métodos construtivos inovadores, como LSF (Light Steel Framing) e ICF (Insulated Concrete Forms), que nos permitem oferecer soluções mais rápidas, eficientes do ponto de vista energético e com menor impacto ambiental."
          />
        </ScrollReveal>
        <ScrollReveal>
          <CtaBanner
            buttonLabel="Peça o seu orçamento"
            description={SOBRE_NOS_CTA_DESCRIPTION}
            dialogTitle="Pedido de orçamento"
            title={SOBRE_NOS_CTA_TITLE}
          />
        </ScrollReveal>
        <ScrollReveal>
          <SobreNosMissionVisionValues />
        </ScrollReveal>
        <ScrollReveal>
          <CenterSection
            srTitle="Nossa presença principalmente em Coimbra e na Região Centro de Portugal"
            description="Com presença principalmente em Coimbra e na Região Centro de Portugal, asseguramos um acompanhamento próximo e um profundo conhecimento do mercado local, criando relações de confiança duradouras com clientes particulares, investidores e empresas"
          />
        </ScrollReveal>
        <ScrollReveal>
          <ImageFull
            alt="Equipa de trabalhadores da construção com coletes de alta visibilidade e capacetes a trabalhar betão fresco numa grande obra."
            src="/images/sobre-nos/sobre-nos-full-width.png"
          />
        </ScrollReveal>
        <ScrollReveal>
          <SobreNosDifferentiators contactHref={`/${lang}/contactos`} />
        </ScrollReveal>
      </main>
    </div>
  );
}
