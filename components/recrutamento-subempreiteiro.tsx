import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import {
  CircleMinus,
  CirclePlus,
  HardHat,
  type LucideIcon,
} from "lucide-react";
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
    categoryId: "recrutamento-benefits-why-join-us",
    categoryLabel: "O QUE PROCURAMOS",
    Icon: HardHat,
    items: [
      "Experiência comprovada na especialidade (indicar anos e obras de referência)",
      "Documentação em dia: alvará, seguros, certidões e registos obrigatórios",
      "Capacidade de resposta e cumprimento de prazos",
      "Estamos em crescimento, o seu percurso cresce connosco",
      "Compromisso com as normas de segurança em obra",
      "Disponibilidade para trabalhar na Região Centro de Portugal",
    ],
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

export function RecrutamentoSubempreiteiro() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full bg-background">
      <div
        className={cn(
          "mx-auto w-full px-4 py-12 sm:px-5 md:py-16 lg:py-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
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
              src="/images/recrutamento/subempreiteiro.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
