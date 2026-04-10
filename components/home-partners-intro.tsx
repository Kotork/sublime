import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Placeholder imagery evoking construction partners; replace with real logos when available. */
const PARTNER_PLACEHOLDERS = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    imageAlt:
      "Imagem representativa de parceiro — edifícios e ambiente corporativo (placeholder de logótipo).",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    imageAlt:
      "Imagem representativa de parceiro — obra e equipamento de construção (placeholder de logótipo).",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    imageAlt:
      "Imagem representativa de parceiro — estruturas e engenharia (placeholder de logótipo).",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    imageAlt:
      "Imagem representativa de parceiro — projeto residencial (placeholder de logótipo).",
  },
] as const;

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
          Marcas e organizações parceiras da SublimePT (imagens de exemplo).
        </p>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
          {PARTNER_PLACEHOLDERS.map((partner, index) => (
            <li key={partner.imageSrc}>
              <figure className="m-0">
                <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    alt={`${partner.imageAlt} Parceiro ${index + 1} de ${PARTNER_PLACEHOLDERS.length}.`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    src={partner.imageSrc}
                  />
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
