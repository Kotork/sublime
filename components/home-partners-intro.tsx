import { Badge } from "@/components/ui/badge";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

/** Placeholder logo: Sublime logo repeated until real partner logos are available. */
const PARTNER_LOGO_SRC = "/logo.png";

type Partner = {
  readonly name: string;
  readonly category: string;
};

const PARTNERS: readonly Partner[] = [
  { name: "Knauf", category: "LSF / Placas" },
  { name: "Saint-Gobain", category: "Isolamentos / Gyproc" },
  { name: "Weber", category: "Argamassas / Etics" },
  { name: "Sika", category: "Impermeabilização" },
  { name: "Cimpor / Secil", category: "Betão e Cimento" },
  { name: "Fassa Bortolo", category: "Revestimentos" },
  { name: "Hilti", category: "Fixações LSF" },
  { name: "Mapei", category: "Colas e Selantes" },
  { name: "Nudura", category: "Blocos ICF" },
  { name: "Gyproc", category: "Gesso cartonado" },
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
        <header className="mb-10 flex max-w-3xl flex-col md:mb-12">
          <Badge
            className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
            variant="outline"
          >
            Parceiros e Fornecedores
          </Badge>
          <h2
            className="text-pretty text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
            id="home-partners-heading"
          >
            Materiais de referência em cada projeto.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Trabalhamos exclusivamente com marcas certificadas, para garantir
            que cada obra usa os melhores materiais do mercado.
          </p>
          <Link
            className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={partnersHref}
          >
            Conhecer todos os parceiros
            <span aria-hidden>→</span>
          </Link>
        </header>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-5">
          {PARTNERS.map((partner, index) => (
            <li key={partner.name}>
              <figure className="m-0 flex h-full flex-col items-center justify-center rounded-xl border border-border bg-card px-4 py-6 text-center shadow-sm transition-shadow hover:shadow-md md:px-5 md:py-7">
                <div className="relative h-12 w-12 md:h-14 md:w-14">
                  <Image
                    alt={`Logótipo SublimePT (placeholder). Parceiro ${index + 1} de ${PARTNERS.length}: ${partner.name}.`}
                    className="object-contain"
                    fill
                    sizes="56px"
                    src={PARTNER_LOGO_SRC}
                  />
                </div>
                <figcaption className="mt-4 flex flex-col gap-1">
                  <span className="text-sm font-bold leading-snug text-foreground md:text-base">
                    {partner.name}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground md:text-sm">
                    {partner.category}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
