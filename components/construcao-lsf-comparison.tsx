"use client";

import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import {
  Feather,
  Sparkles,
  Target,
  Thermometer,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";

const HEADING_ID = "construcao-lsf-comparison-heading";
const ADVANTAGES_HEADING_ID = "construcao-lsf-advantages-heading";

type Advantage = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const ADVANTAGES: readonly Advantage[] = [
  {
    id: "obra-rapida",
    icon: Timer,
    title: "Obra mais rápida",
    description:
      "O prazo de construção pode reduzir-se em cerca de 30 a 40% face ao método convencional.",
  },
  {
    id: "leveza",
    icon: Feather,
    title: "Leveza",
    description:
      "Estrutura leve, ideal para ampliar ou acrescentar pisos sem sobrecarregar fundações.",
  },
  {
    id: "precisao",
    icon: Target,
    title: "Precisão",
    description:
      "Estrutura calculada em projeto e produzida com rigor, com menos desperdício em obra.",
  },
  {
    id: "conforto",
    icon: Thermometer,
    title: "Conforto térmico e acústico",
    description:
      "O sistema integra isolamento contínuo, com boa eficiência energética.",
  },
  {
    id: "obra-limpa",
    icon: Sparkles,
    title: "Obra limpa e controlada",
    description: "Montagem a seco, menos resíduos e menos imprevistos.",
  },
] as const;

const CARD_TITLE_CLASS =
  "text-sm font-bold leading-snug text-foreground md:text-base";

const CARD_BODY_CLASS =
  "text-pretty text-sm leading-relaxed text-muted-foreground md:text-base";

function AdvantageCard({
  advantage,
  className,
}: {
  advantage: Advantage;
  className?: string;
}) {
  const { icon: Icon, title, description } = advantage;

  return (
    <li
      className={cn(
        "flex items-start gap-4 rounded-lg bg-muted p-5 md:p-6",
        className
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-card text-primary shadow-sm md:size-12">
        <Icon aria-hidden className="size-5 md:size-6" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className={CARD_TITLE_CLASS}>{title}</h3>
        <p className={cn(CARD_BODY_CLASS, "mt-1")}>{description}</p>
      </div>
    </li>
  );
}

export function ConstrucaoLsfComparison() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full">
      <div
        className={cn(
          "mx-auto w-full px-4 pb-12 sm:px-5 md:pb-16 lg:pb-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <Badge
          className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
          variant="outline"
        >
          Light Steel Framing
        </Badge>
        <h2
          className="text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          O que é o LSF
        </h2>
        <div className="mt-6 max-w-4xl space-y-4 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          <p>
            O Light Steel Framing (LSF) é um sistema construtivo industrializado
            que utiliza perfis de aço galvanizado de alta resistência como
            estrutura principal. Os perfis são calculados e produzidos à medida
            com rigor milimétrico, o que torna a obra mais rápida, mais limpa e
            mais previsível do que a construção convencional.
          </p>
          <p>
            É especialmente indicado para moradias unifamiliares, ampliações
            (incluindo pisos adicionais) e reabilitações por ser leve, não
            sobrecarrega as fundações nem as estruturas existentes.
          </p>
        </div>

        <div
          aria-labelledby={ADVANTAGES_HEADING_ID}
          className="mt-12 md:mt-16"
        >
          <h3
            className="text-center text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
            id={ADVANTAGES_HEADING_ID}
          >
            Vantagens do LSF
          </h3>
          <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6 lg:gap-5">
            {ADVANTAGES.map((advantage, index) => (
              <AdvantageCard
                advantage={advantage}
                className={cn(
                  "lg:col-span-2",
                  index === 3 && "lg:col-start-2"
                )}
                key={advantage.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
