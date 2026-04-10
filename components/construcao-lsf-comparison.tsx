"use client";

import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { CircleMinus, CirclePlus, type LucideIcon } from "lucide-react";

const HEADING_ID = "construcao-lsf-comparison-heading";

const COLUMN_TITLE_CLASS =
  "mb-3 text-sm font-bold uppercase tracking-tight text-foreground md:mb-4 md:text-base";

const LIST_CLASS =
  "list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-foreground md:text-base";

type ComparisonBlock = {
  categoryId: string;
  categoryLabel: string;
  Icon: LucideIcon;
  lsfItems: readonly string[];
  tradicionalItems: readonly string[];
};

const BLOCKS: readonly ComparisonBlock[] = [
  {
    categoryId: "construcao-lsf-vantagens",
    categoryLabel: "VANTAGENS",
    Icon: CirclePlus,
    lsfItems: [
      "Construção até 40% mais rápida",
      "Excelente desempenho térmico e acústico",
      "Elevada resistência estrutural",
      "Menor desperdício de materiais em obra",
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
    categoryId: "construcao-lsf-desvantagens",
    categoryLabel: "DESVANTAGENS",
    Icon: CircleMinus,
    lsfItems: ["Estabilidade da estrutura"],
    tradicionalItems: ["Custo inicial mais elevado", "Tempo de operação"],
  },
] as const;

function ComparisonTable({
  block,
  isFirst,
}: {
  block: ComparisonBlock;
  isFirst: boolean;
}) {
  const { categoryId, categoryLabel, Icon, lsfItems, tradicionalItems } = block;

  return (
    <div
      aria-labelledby={categoryId}
      className={cn(
        "grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,10.5rem)_1fr_1fr] md:gap-10 lg:gap-12",
        !isFirst && "pt-10 md:pt-16"
      )}
      role="group"
    >
      <div className="flex flex-row items-start gap-3 md:flex-col md:gap-4">
        <Icon
          aria-hidden
          className="size-9 shrink-0 text-foreground stroke-[1.5] md:size-10"
        />
        <h3
          className="text-sm font-bold uppercase tracking-tight text-foreground md:text-base"
          id={categoryId}
        >
          {categoryLabel}
        </h3>
      </div>
      <div>
        <h4 className={COLUMN_TITLE_CLASS}>LSF</h4>
        <ul className={LIST_CLASS}>
          {lsfItems.map((item) => (
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

export function ConstrucaoLsfComparison() {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="w-full"
    >
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
          LSF vs CONSTRUÇÃO TRADICIONAL SUSTENTÁVEL
        </h2>
        <div className="mt-6 max-w-4xl space-y-4 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          <p>
            A escolha do sistema construtivo influencia diretamente o tempo de
            execução, a eficiência energética e o desempenho global da
            construção. O LSF destaca-se por ser uma solução leve, rápida e
            tecnologicamente avançada, diferenciando-se claramente dos métodos
            tradicionais.
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
