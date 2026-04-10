import CenterSection from "@/components/center-section";
import { ImageFull } from '@/components/image-full';
import { RecrutamentoBenefits } from "@/components/recrutamento-benefits";
import { RecrutamentoSpontaneousCta } from "@/components/recrutamento-spontaneous-cta";
import { RecrutamentoSubempreiteiro } from '@/components/recrutamento-subempreiteiro';
import { RecrutamentoSubempreiteiroCta } from '@/components/recrutamento-subempreiteiro-cta';
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Locale } from "@/lib/i18n/locale";
import { isValidLocale } from "@/lib/i18n/locale";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

export default async function RecrutamentoPage({
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
    <main>
      <WebsiteSplitPageHero
        eyebrow="RECRUTAMENTO /"
        headingId="recrutamento-hero-heading"
        imageAlt={RECRUTAMENTO_HERO_IMAGE_ALT}
        imageSrc={RECRUTAMENTO_HERO_IMAGE_SRC}
        titleLines={["TRABALHE", "CONNOSCO"]}
      />
      <CenterSection
        srTitle="Junte-se a uma equipa jovem, motivada e em crescimento."
        description="Junte-se a uma equipa jovem, motivada e em crescimento. Estamos sempre atentos a profissionais que queiram construir connosco."
      />
      <RecrutamentoBenefits />
      <RecrutamentoSpontaneousCta />
      <ImageFull
        alt="Imagem de pessoas a trabalhar numa obra em equipa."
        src="/images/parceiros/parceiros-full-width.png"
      />
      <h2 className="text-pretty text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl pt-12">
        SUBEMPREITEIROS
      </h2>
      <CenterSection
        srTitle="Colaboramos regularmente com subempreiteiros especializados para garantir a máxima qualidade e eficiência nas obras."
        description="Colaboramos regularmente com subempreiteiros especializados para garantir a máxima qualidade e eficiência nas obras. Se é um profissional ou empresa com experiência comprovada, gostaríamos de tê-lo na nossa rede."
      />
      <RecrutamentoSubempreiteiro />
      <RecrutamentoSubempreiteiroCta contactHref={`/${lang}/contactos`} />
    </main>
  );
}
