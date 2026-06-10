"use client";

import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import {
  Leaf,
  Shield,
  Thermometer,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";

const HEADING_ID = "construcao-icf-comparison-heading";
const ADVANTAGES_HEADING_ID = "construcao-icf-advantages-heading";

type Advantage = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const ADVANTAGES: readonly Advantage[] = [
  {
    id: "isolamento",
    icon: Thermometer,
    title: "Elevado isolamento térmico e acústico",
    description:
      "O isolamento contínuo reduz pontes térmicas e o ruído.",
  },
  {
    id: "robustez",
    icon: Shield,
    title: "Robustez e durabilidade",
    description:
      "Estrutura monolítica em betão armado, resistente e de baixa manutenção.",
  },
  {
    id: "eficiencia",
    icon: Leaf,
    title: "Eficiência energética",
    description:
      "Bom desempenho que se reflete no conforto e nas faturas de energia.",
  },
  {
    id: "execucao",
    icon: Timer,
    title: "Execução eficiente",
    description: "O sistema de blocos acelera a fase de estrutura.",
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

export function ConstrucaoIcfComparison() {
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
          Insulated Concrete Forms
        </Badge>
        <h2
          className="text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          O que é o ICF
        </h2>
        <div className="mt-6 max-w-4xl space-y-4 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          <p>
            O ICF (Insulated Concrete Forms, ou cofragem de betão isolado)
            combina a robustez do betão armado com isolamento térmico integrado.
            Blocos de poliestireno expandido (EPS) funcionam, ao mesmo tempo,
            como cofragem e como isolamento permanente, sendo preenchidos com
            betão armado no interior.
          </p>
          <p>
            O resultado é uma estrutura monolítica, muito resistente e com
            elevado conforto térmico e acústico. É indicado para moradias,
            edifícios multifamiliares e ampliações.
          </p>
        </div>

        <div aria-labelledby={ADVANTAGES_HEADING_ID} className="mt-12 md:mt-16">
          <h3
            className="text-center text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
            id={ADVANTAGES_HEADING_ID}
          >
            Vantagens do ICF
          </h3>
          <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:mt-12 lg:gap-5">
            {ADVANTAGES.map((advantage) => (
              <AdvantageCard advantage={advantage} key={advantage.id} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
