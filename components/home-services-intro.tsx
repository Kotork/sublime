import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/locale";
import Image from "next/image";
import Link from "next/link";

const SDG_ICON = (n: number) =>
  `https://open-sdg.org/sdg-translations/assets/img/goals/en/${n}.png`;

const SERVICES = [
  {
    slug: "construcao-lsf",
    title: "Construção em LSF",
    imageSrc:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80",
    imageAlt:
      "Estrutura metálica de perfis leves em obra, ilustrativa de construção em LSF (Light Steel Frame).",
  },
  {
    slug: "construcao-icf",
    title: "Construção em ICF",
    imageSrc:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
    imageAlt:
      "Trabalhos de betão e estrutura em obra, alinhados com sistemas como ICF (Insulated Concrete Forms).",
  },
  {
    slug: "construcao-tradicional-sustentavel",
    title: "Construção Tradicional Sustentável",
    imageSrc:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=80",
    imageAlt:
      "Alvenaria e acabamentos em obra, representativa de construção tradicional com enfoque sustentável.",
  },
] as const;

const SDG_GOALS = [
  {
    n: 7 as const,
    label: "7 — Energias renováveis e acessíveis",
    shortLabel: "7 Energias renováveis e acessíveis",
  },
  {
    n: 9 as const,
    label: "9 — Indústria, inovação e infraestruturas",
    shortLabel: "9 Indústria, inovação e infraestruturas",
  },
  {
    n: 11 as const,
    label: "11 — Cidades e comunidades sustentáveis",
    shortLabel: "11 Cidades e comunidades sustentáveis",
  },
  {
    n: 12 as const,
    label: "12 — Produção e consumo sustentáveis",
    shortLabel: "12 Produção e consumo sustentáveis",
  },
  {
    n: 13 as const,
    label: "13 — Ação climática",
    shortLabel: "13 Ação climática",
  },
] as const;

type HomeServicesIntroProps = {
  lang: Locale;
};

export function HomeServicesIntro({ lang }: HomeServicesIntroProps) {
  return (
    <section
      aria-labelledby="home-services-heading"
      className="w-full bg-background"
      id="services"
    >
      <div
        className={cn(
          "mx-auto px-4 pb-16 sm:px-5 md:pb-20 lg:pb-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2
          className="mb-8 text-left text-lg font-bold uppercase tracking-tight text-foreground md:mb-10 md:text-xl"
          id="home-services-heading"
        >
          02 / SERVIÇOS
        </h2>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                href={`/${lang}/${s.slug}`}
              >
                <article className="flex flex-col">
                  <div className="relative aspect-square w-full overflow-hidden bg-muted">
                    <Image
                      alt={s.imageAlt}
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={s.imageSrc}
                    />
                  </div>
                  <h3 className="mt-4 text-center text-base font-medium text-foreground md:text-lg">
                    {s.title}
                  </h3>
                </article>
              </Link>
            </li>
          ))}
        </ul>

        {/* <div
          aria-labelledby="home-sdg-heading"
          className="mt-14 pt-12 md:mt-16 md:pt-14"
        >
          <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 md:gap-4 lg:gap-6">
            {SDG_GOALS.map((goal) => (
              <li key={goal.n}>
                <figure className="flex flex-col items-center text-center">
                  <div className="relative size-24 shrink-0 sm:size-28 md:size-24 lg:size-28">
                    <Image
                      alt={`Ícone ODS ${goal.n}: ${goal.label}`}
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 112px, 112px"
                      src={SDG_ICON(goal.n)}
                    />
                  </div>
                  <figcaption className="mt-3 max-w-44 text-pretty text-xs font-medium leading-snug text-foreground sm:text-sm md:text-xs lg:text-sm">
                    {goal.shortLabel}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            Ícones alinhados com os{" "}
            <a
              className="underline underline-offset-2 hover:text-foreground"
              href="https://www.un.org/sustainabledevelopment"
              rel="noreferrer"
              target="_blank"
            >
              Objetivos de Desenvolvimento Sustentável da Organização das Nações
              Unidas
            </a>
            . A SublimePT articula a sua atuação com os ODS indicados.
          </p>
        </div> */}
      </div>
    </section>
  );
}
