import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Clock,
  Leaf,
  PencilRuler,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const HEADING_ID = "sobre-nos-differentiators-heading";

const ITEMS: readonly {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: BadgeCheck,
    title: "QUALIDADE",
    description:
      "Processos de controlo rigorosos em todas as fases da obra, desde o projeto até à entrega final.",
  },
  {
    icon: Clock,
    title: "CUMPRIMENTO DE PRAZOS",
    description:
      "Planeamento detalhado e gestão ativa da obra para garantir entregas dentro do prazo acordado.",
  },
  {
    icon: PencilRuler,
    title: "DESIGN",
    description:
      "Soluções arquitetónicas pensadas para aliar estética, funcionalidade e eficiência.",
  },
  {
    icon: Leaf,
    title: "SUSTENTABILIDADE",
    description:
      "Adoção de sistemas de baixo impacto ambiental, como LSF e ICF, com materiais certificados.",
  },
  {
    icon: Users,
    title: "EQUIPA ADAPTÁVEL",
    description:
      "Dimensionamos a equipa em função das necessidades específicas de cada projeto e cliente.",
  },
  {
    icon: Search,
    title: "TRANSPARÊNCIA",
    description:
      "Comunicação clara e direta em todas as fases: do orçamento à entrega.",
  },
] as const;

const TITLE_CLASS =
  "text-sm font-bold uppercase leading-snug tracking-tight text-foreground md:text-base";

const BODY_CLASS =
  "text-pretty text-sm leading-relaxed text-muted-foreground md:text-base";

const CTA_CLASS =
  "inline-flex h-11 items-center justify-center rounded-md bg-[#165A72] px-8 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#124a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export type SobreNosDifferentiatorsProps = {
  contactHref: string;
};

export function SobreNosDifferentiators({
  contactHref,
}: SobreNosDifferentiatorsProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="w-full bg-background"
    >
      <div
        className={cn(
          "mx-auto w-full px-4 py-12 sm:px-5 md:py-16 lg:py-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2
          className="text-center text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          O QUE NOS DIFERENCIA
        </h2>
        <ul className="mt-10 grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
          {ITEMS.map(({ icon: Icon, title, description }) => (
            <li className="flex items-start gap-4" key={title}>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary md:size-10">
                <Icon
                  aria-hidden
                  className="size-5 md:size-[1.35rem]"
                  strokeWidth={1.75}
                />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className={TITLE_CLASS}>{title}</h3>
                <p className={cn(BODY_CLASS, "mt-1")}>{description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center lg:mt-16">
          <Link className={CTA_CLASS} href={contactHref}>
            Contacte-nos
          </Link>
        </div>
      </div>
    </section>
  );
}
