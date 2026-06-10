"use client";

import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import {
  Building2,
  CircleCheck,
  Leaf,
  ShieldCheck,
  Thermometer,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";

const HEADING_ID = "construcao-cts-comparison-heading";
const RIGHT_CHOICE_HEADING_ID = "construcao-cts-right-choice-heading";
const ADVANTAGES_HEADING_ID = "construcao-cts-advantages-heading";

const RIGHT_CHOICES = [
  "Reabilitação e remodelação de edifícios existentes.",
  "Construção de raiz em contexto urbano.",
  "Projetos que valorizam grande inércia térmica e materiais amplamente conhecidos.",
  "Obras que exigem flexibilidade de design e adaptação ao terreno.",
] as const;

type Advantage = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const ADVANTAGES: readonly Advantage[] = [
  {
    id: "eficiencia-energetica",
    icon: Thermometer,
    title: "Eficiência energética",
    description:
      "Soluções de isolamento e envolvente orientadas para classe energética A ou superior.",
  },
  {
    id: "isolamento-acustico",
    icon: ShieldCheck,
    title: "Isolamento acústico",
    description:
      "Materiais e detalhes construtivos que melhoram o conforto acústico no interior.",
  },
  {
    id: "impacto-ambiental",
    icon: Leaf,
    title: "Menor impacto ambiental",
    description:
      "Seleção de materiais e práticas de obra que reduzem desperdício e pegada ecológica.",
  },
  {
    id: "mercado-consolidado",
    icon: Building2,
    title: "Tecnologia consolidada",
    description:
      "Método amplamente reconhecido no mercado português, com equipas e fornecedores experientes.",
  },
  {
    id: "flexibilidade",
    icon: Wrench,
    title: "Flexibilidade de design",
    description:
      "Adaptação ao terreno, ao contexto urbano e às necessidades específicas de cada projeto.",
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

export function ConstrucaoCtsComparison() {
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
          Alvenaria sustentável
        </Badge>
        <h2
          className="text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          O que é a construção convencional
        </h2>
        <div className="mt-6 max-w-4xl space-y-4 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          <p>
            A construção convencional, que inclui alvenaria de tijolo e
            estrutura de betão armado, é o método mais consolidado e reconhecido
            em Portugal: sólido, durável e flexível.
          </p>
          <p>
            É a base do trabalho da SublimePT, executada com as melhores
            práticas atuais de isolamento térmico e acústico e de eficiência
            energética.
          </p>
        </div>

        <div
          aria-labelledby={RIGHT_CHOICE_HEADING_ID}
          className="mt-12 md:mt-16"
        >
          <h3
            className="max-w-4xl text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
            id={RIGHT_CHOICE_HEADING_ID}
          >
            Quando é a escolha certa
          </h3>
          <ul className="mt-6 max-w-4xl list-none space-y-3 p-0 md:mt-8">
            {RIGHT_CHOICES.map((item) => (
              <li
                className="flex items-start gap-3 text-pretty text-base leading-relaxed text-muted-foreground md:gap-3.5 md:text-lg"
                key={item}
              >
                <CircleCheck
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-primary md:mt-1"
                  strokeWidth={2}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div aria-labelledby={ADVANTAGES_HEADING_ID} className="mt-12 md:mt-16">
          <h3
            className="text-center text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
            id={ADVANTAGES_HEADING_ID}
          >
            Vantagens da alvenaria sustentável
          </h3>
          <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6 lg:gap-5">
            {ADVANTAGES.map((advantage, index) => (
              <AdvantageCard
                advantage={advantage}
                className={cn("lg:col-span-2", index === 3 && "lg:col-start-2")}
                key={advantage.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
