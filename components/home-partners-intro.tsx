import { Badge } from "@/components/ui/badge";
import { PartnersIntroCards } from "@/components/home-partners-intro-cards";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import type { Locale } from "@/lib/i18n/locale";
import { PARTNERS } from "@/lib/home-partners";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

        <PartnersIntroCards partners={PARTNERS} />
      </div>
    </section>
  );
}
