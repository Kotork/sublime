import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import type { Metadata } from "next";

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

export default function ContactosPage() {
  return (
    <main>
      <WebsiteSplitPageHero
        eyebrow="CONTACTOS /"
        headingId="contactos-hero-heading"
        imageAlt={CONTACTOS_HERO_IMAGE_ALT}
        imageSrc={CONTACTOS_HERO_IMAGE_SRC}
        titleLines={["FALE COM A", "NOSSA EQUIPA"]}
      />
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Conteúdo da página em breve.
        </p>
      </div>
    </main>
  );
}
