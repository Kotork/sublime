"use client";

import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { CircleMinus, CirclePlus, type LucideIcon } from "lucide-react";

const HEADING_ID = "construcao-icf-comparison-heading";

const COLUMN_TITLE_CLASS =
  "mb-2 text-sm font-bold uppercase tracking-tight text-foreground md:text-base";

const LIST_CLASS =
  "list-none space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base";

type ComparisonBlock = {
  categoryId: string;
  categoryLabel: string;
  Icon: LucideIcon;
  IcfItems: readonly string[];
  tradicionalItems: readonly string[];
};

const BLOCKS: readonly ComparisonBlock[] = [
  {
    categoryId: "construcao-icf-vantagens",
    categoryLabel: "VANTAGENS",
    Icon: CirclePlus,
    IcfItems: [
      "Rapidez na obra",
      "Isolamento térmico e acústico superior",
      "Resistência estrutural e durabilidade",
      "Sustentabilidade e eficiência energética",
      "Baixa manutenção",
    ],
    tradicionalItems: [
      "Eficiência energética (classe A ou superior)",
      "Melhor isolamento acústico",
      "Redução do impacto ambiental",
      "Tecnologia testada e aceite pelo mercado",
      "Flexibilidade de design e adaptação ao terreno",
    ],
  },
  {
    categoryId: "construcao-icf-desvantagens",
    categoryLabel: "DESVANTAGENS",
    Icon: CircleMinus,
    IcfItems: ["Custo inicial mais elevado"],
    tradicionalItems: ["Tempo de operação"],
  },
] as const;

function ComparisonTable({
  block,
  isFirst,
}: {
  block: ComparisonBlock;
  isFirst: boolean;
}) {
  const { categoryId, categoryLabel, Icon, IcfItems, tradicionalItems } = block;

  return (
    <div
      aria-labelledby={categoryId}
      className={cn(
        "grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,10.5rem)_1fr_1fr] md:gap-10 lg:gap-12",
        !isFirst && "pt-10 md:pt-16"
      )}
      role="group"
    >
      <div className="flex flex-row items-start gap-2 md:flex-col">
        <Icon
          aria-hidden
          className="size-6 shrink-0 text-foreground stroke-1 "
        />
        <h3
          className="text-sm font-bold uppercase tracking-tight text-foreground md:text-base"
          id={categoryId}
        >
          {categoryLabel}
        </h3>
      </div>
      <div>
        <h4 className={COLUMN_TITLE_CLASS}>ICF</h4>
        <ul className={LIST_CLASS}>
          {IcfItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className={COLUMN_TITLE_CLASS}>CONSTRUÇÃO TRADICIONAL</h4>
        <ul className={LIST_CLASS}>
          {tradicionalItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ConstrucaoIcfComparison() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full">
      <div
        className={cn(
          "mx-auto w-full px-4 py-12 sm:px-5 md:py-16 lg:py-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2
          className="text-pretty text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          ICF vs CONSTRUÇÃO TRADICIONAL SUSTENTÁVEL
        </h2>
        <div className="mt-6 max-w-4xl space-y-4 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          <p>
            A escolha do sistema construtivo tem um impacto direto no conforto,
            eficiência e durabilidade de um edifício. O ICF destaca-se por
            combinar a robustez do betão com um isolamento térmico integrado,
            apresentando uma abordagem diferente da construção tradicional.
          </p>
          <p>
            Aqui estão os principais pontos de comparação para o ajudar a
            compreender melhor as diferenças e tomar uma decisão informada.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          {BLOCKS.map((block, index) => (
            <ComparisonTable
              block={block}
              isFirst={index === 0}
              key={block.categoryId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
