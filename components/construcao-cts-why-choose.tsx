import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import { CircleMinus, CirclePlus, type LucideIcon } from "lucide-react";
import Image from "next/image";

const HEADING_ID = "construcao-cts-why-choose-heading";

const SECTION_IMAGE_ALT =
  "Estrutura de betão e alvenaria em construção em altura, representativa de construção tradicional sustentável.";

const LIST_CLASS =
  "list-none space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base";

type ProsConsBlock = {
  readonly categoryId: string;
  readonly categoryLabel: string;
  readonly Icon: LucideIcon;
  readonly items: readonly string[];
};

const BLOCKS: readonly ProsConsBlock[] = [
  {
    categoryId: "construcao-cts-why-vantagens",
    categoryLabel: "VANTAGENS",
    Icon: CirclePlus,
    items: [
      "Eficiência energética (classe A ou superior)",
      "Melhor isolamento acústico",
      "Redução do impacto ambiental",
      "Tecnologia testada e aceite pelo mercado",
      "Flexibilidade de design e adaptação ao terreno",
    ],
  },
  {
    categoryId: "construcao-cts-why-desvantagens",
    categoryLabel: "DESVANTAGENS",
    Icon: CircleMinus,
    items: ["Custo inicial mais elevado", "Tempo de operação"],
  },
] as const;

function ProsConsBlockView({
  block,
  isFirst,
}: {
  block: ProsConsBlock;
  isFirst: boolean;
}) {
  const { categoryId, categoryLabel, Icon, items } = block;

  return (
    <div
      aria-labelledby={categoryId}
      className={cn(
        "grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,10.5rem)_1fr] md:gap-10 lg:gap-12",
        !isFirst && "pt-10 md:pt-16"
      )}
      role="group"
    >
      <div className="flex flex-row items-start gap-2 md:flex-col">
        <Icon
          aria-hidden
          className="size-6 shrink-0 stroke-1 text-foreground"
        />
        <h3
          className="text-sm font-bold uppercase tracking-tight text-foreground md:text-base"
          id={categoryId}
        >
          {categoryLabel}
        </h3>
      </div>
      <ul className={LIST_CLASS}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ConstrucaoCtsWhyChoose() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full bg-background">
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
          Porque escolher a construção tradicional sustentável?
        </h2>
        <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          A construção tradicional continua a ser uma solução de referência,
          agora aliada a práticas mais sustentáveis e eficientes. Com métodos
          consolidados e adaptados às exigências atuais, permite garantir
          conforto, durabilidade e flexibilidade em cada projeto.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="order-2 min-w-0 md:order-1">
            {BLOCKS.map((block, index) => (
              <ProsConsBlockView
                block={block}
                isFirst={index === 0}
                key={block.categoryId}
              />
            ))}
          </div>
          <div className="relative order-1 aspect-3/4 w-full overflow-hidden rounded-md bg-muted md:order-2 lg:aspect-auto lg:min-h-0 lg:h-full">
            <Image
              alt={SECTION_IMAGE_ALT}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/services/cts/vantagens.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
