import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PartnersIntroCards } from './home-partners-intro-cards';
import { PARTNERS } from '@/lib/home-partners';

/** Placeholder tiles: Sublime logo repeated until real partner logos are available. */
const PARTNER_LOGO_SRC = "/logo.png";
const PARTNER_PLACEHOLDER_COUNT = 8;

const INTRO_COPY =
  "A SublimePT trabalha com um conjunto criterioso de parceiros que partilham os mesmos valores de qualidade, inovação e compromisso. As parcerias são construídas com base na confiança mútua e na complementaridade de competências.";

export function ParceirosPartnersIntro() {
  return (
    <section
      aria-labelledby="parceiros-partners-intro-heading"
      className="w-full bg-background"
    >
      <div
        className={cn(
          "mx-auto px-4 py-16 sm:px-5 md:py-20 lg:py-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2 className="sr-only" id="parceiros-partners-intro-heading">
          Parcerias da SublimePT
        </h2>

        <p className="mb-10 text-left text-base leading-relaxed text-foreground md:mb-12 md:text-lg">
          {INTRO_COPY}
        </p>

        <p className="sr-only">
          Grelha de logótipos de parceiros (marcador de posição com o logótipo
          SublimePT até existirem imagens definitivas).
        </p>

        <PartnersIntroCards partners={PARTNERS} />
      </div>
    </section>
  );
}
