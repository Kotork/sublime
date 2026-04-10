import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Placeholder tiles: Sublime logo repeated until real partner logos are available. */
const PARTNER_LOGO_SRC = "/logo.png";
const PARTNER_PLACEHOLDER_COUNT = 4;

type HomePartnersIntroProps = {
  lang: Locale;
};

export function HomePartnersIntro({ lang }: HomePartnersIntroProps) {
  const partnersHref = `/${lang}/parceiros`;

  return (
    <section
      aria-labelledby="home-partners-heading"
      className="w-full bg-background"
      id="partners"
    >
      <div
        className={cn(
          "mx-auto px-4 pb-16 sm:px-5 md:pb-20 lg:pb-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2
          className="mb-6 text-left text-lg font-bold uppercase tracking-tight text-foreground md:mb-8 md:text-xl"
          id="home-partners-heading"
        >
          03 / PARCEIROS
        </h2>

        <p className="sr-only">
          Marcas e organizações parceiras da SublimePT (logótipo repetido como
          marcador de posição).
        </p>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
          {Array.from({ length: PARTNER_PLACEHOLDER_COUNT }, (_, index) => (
            <li key={index}>
              <figure className="m-0">
                <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg bg-muted">
                  <div className="absolute inset-0 p-4 sm:p-5 md:p-6">
                    <div className="relative h-full w-full">
                      <Image
                        alt={`Logótipo SublimePT (placeholder). Parceiro ${index + 1} de ${PARTNER_PLACEHOLDER_COUNT}.`}
                        className="object-contain"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        src={PARTNER_LOGO_SRC}
                      />
                    </div>
                  </div>
                </div>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={partnersHref}
          >
            <ChevronRight
              aria-hidden
              className="size-4 shrink-0 md:size-4.5"
              strokeWidth={2}
            />
            VER MAIS
          </Link>
        </div>
      </div>
    </section>
  );
}
