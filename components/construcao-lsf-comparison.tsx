"use client";

import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { CircleMinus, CirclePlus, type LucideIcon } from "lucide-react";
import { Badge } from "./ui/badge";

const HEADING_ID = "construcao-lsf-comparison-heading";

const COLUMN_TITLE_CLASS =
  "mb-2 text-sm font-bold uppercase tracking-tight text-foreground md:text-base";

const LIST_CLASS =
  "list-none space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base";

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
      <div className="flex flex-row items-start gap-2 md:flex-col">
        <Icon aria-hidden className="size-6 shrink-0 text-primary stroke-1" />
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
          className="text-pretty text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
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
