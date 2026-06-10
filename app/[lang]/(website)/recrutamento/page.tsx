import CenterSection from "@/components/center-section";
import { CtaBanner } from "@/components/cta-banner";
import { ImageFull } from "@/components/image-full";
import { RecrutamentoBenefits } from "@/components/recrutamento-benefits";
import { RecrutamentoSubempreiteiro } from "@/components/recrutamento-subempreiteiro";
import { RecrutamentoSubempreiteiroCta } from "@/components/recrutamento-subempreiteiro-cta";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import { CONTACT_FORM_ID } from "@/lib/contact-form";
import type { Locale } from "@/lib/i18n/locale";
import { isValidLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const RECRUTAMENTO_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80";

export const RECRUTAMENTO_HERO_IMAGE_ALT =
  "Equipa e estruturas em obra, evocando carreiras na construção sustentável.";

const PAGE_DESCRIPTION =
  "Oportunidades de carreira e recrutamento na SublimePT — trabalhe connosco na construção sustentável.";

const WHATSAPP_HREF = "https://wa.me/351963412090";

const RECRUTAMENTO_CTA_TITLE = "O que oferecemos";
const RECRUTAMENTO_CTA_WHATSAPP_LINK_CLASS =
  "font-semibold underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const RECRUTAMENTO_CTA_DESCRIPTION = (
  <>
    A forma mais rápida é por WhatsApp:{" "}
    <a
      className={RECRUTAMENTO_CTA_WHATSAPP_LINK_CLASS}
      href={WHATSAPP_HREF}
      rel="noopener noreferrer"
      target="_blank"
    >
      963 412 090
    </a>
    . Diga-nos o nome, a função e os anos de experiência. Respondemos em menos
    de 24 horas.
  </>
);
const RECRUTAMENTO_CTA_BUTTON = "Enviar candidatura por WhatsApp";

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
    <div>
      <WebsiteSplitPageHero
        eyebrow="RECRUTAMENTO /"
        headingId="recrutamento-hero-heading"
        imageAlt={RECRUTAMENTO_HERO_IMAGE_ALT}
        imageSrc={RECRUTAMENTO_HERO_IMAGE_SRC}
        titleLines={["TRABALHE", "CONNOSCO"]}
      />
      <main className="flex flex-1 flex-col gap-12 md:gap-16">
        <ScrollReveal>
          <CenterSection
            variant="featured"
            srTitle="Junte-se a uma equipa jovem, motivada e em crescimento. Estamos sempre atentos a profissionais que queiram construir connosco."
            description=""
          />
        </ScrollReveal>
        <ScrollReveal>
          <RecrutamentoBenefits />
        </ScrollReveal>
        <ScrollReveal>
          <CtaBanner
            buttonLabel={RECRUTAMENTO_CTA_BUTTON}
            description={RECRUTAMENTO_CTA_DESCRIPTION}
            href={WHATSAPP_HREF}
            title={RECRUTAMENTO_CTA_TITLE}
          />
        </ScrollReveal>
        <ScrollReveal>
          <ImageFull
            alt="Imagem de pessoas a trabalhar numa obra em equipa."
            src="/images/parceiros/parceiros-full-width.png"
          />
        </ScrollReveal>
        <ScrollReveal>
          <div
            className={cn(
              "mx-auto w-full px-4 pt-12 sm:px-5 md:pt-16",
              WEBSITE_CONTENT_COLUMN_CLASS
            )}
          >
            <h2 className="text-center text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
              SUBEMPREITEIROS
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <CenterSection
            variant="featured"
            srTitle="Colaboramos regularmente com subempreiteiros especializados para garantir a máxima qualidade e eficiência nas obras."
            description=""
          />
        </ScrollReveal>
        <ScrollReveal>
          <RecrutamentoSubempreiteiro />
        </ScrollReveal>
        <ScrollReveal>
          <RecrutamentoSubempreiteiroCta
            contactHref={`/${lang}/contactos#${CONTACT_FORM_ID}`}
          />
        </ScrollReveal>
      </main>
    </div>
  );
}
