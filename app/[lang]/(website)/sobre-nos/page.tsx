import {
  SobreNosHero,
  SOBRE_NOS_HERO_IMAGE_ALT,
  SOBRE_NOS_HERO_IMAGE_SRC,
} from "@/components/sobre-nos-hero";
import type { Metadata } from "next";

const PAGE_DESCRIPTION =
  "Conheça a SublimePT: construímos hoje as casas responsáveis de amanhã — construção civil sustentável, moradias e remodelação.";

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

export default function AboutUsPage() {
  return (
    <main>
      <SobreNosHero />
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Conteúdo da página em breve.
        </p>
      </div>
    </main>
  );
}
