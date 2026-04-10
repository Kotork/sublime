import CenterSection from "@/components/center-section";
import { ContactosContactSection } from "@/components/contactos-contact-section";
import { HomeNewsletter } from '@/components/home-newsletter';
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import { isValidLocale } from "@/lib/i18n/locale";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const CONTACTOS_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1920&q=80";

export const CONTACTOS_HERO_IMAGE_ALT =
  "Contacto telefónico e apoio ao cliente, evocando falar com a equipa da SublimePT.";

const PAGE_DESCRIPTION =
  "Contacte a SublimePT — informações, pedidos de orçamento e apoio da nossa equipa.";

export const metadata: Metadata = {
  title: "Contactos",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Contactos",
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: CONTACTOS_HERO_IMAGE_SRC,
        width: 1920,
        height: 1280,
        alt: CONTACTOS_HERO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactos",
    description: PAGE_DESCRIPTION,
    images: [CONTACTOS_HERO_IMAGE_SRC],
  },
};

export default async function ContactosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  if (!isValidLocale(langParam)) {
    notFound();
  }

  return (
    <main>
      <WebsiteSplitPageHero
        eyebrow="CONTACTOS /"
        headingId="contactos-hero-heading"
        imageAlt={CONTACTOS_HERO_IMAGE_ALT}
        imageSrc={CONTACTOS_HERO_IMAGE_SRC}
        titleLines={["FALE COM A", "NOSSA EQUIPA"]}
      />
      <CenterSection
        srTitle="Na SublimePT, valorizamos a proximidade com os nossos clientes. Entre em contacto connosco para obter informações, esclarecer dúvidas ou dar vida ao seu projeto."
        description="Na SublimePT, valorizamos a proximidade com os nossos clientes. Entre em contacto connosco para obter informações, esclarecer dúvidas ou dar vida ao seu projeto."
      />
      <ContactosContactSection />
      <HomeNewsletter lang={"pt"} />
    </main>
  );
}
