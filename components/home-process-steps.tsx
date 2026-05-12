"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WebsiteQuoteDialog } from "@/components/website-quote-dialog";
import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";

type Step = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
};

const STEPS: readonly Step[] = [
  {
    number: "1",
    title: "Reunião & Visita",
    description:
      "Conhecemo-nos pessoalmente. Visitamos o terreno ou imóvel. Ouvimos os vossos objetivos sem compromisso.",
  },
  {
    number: "2",
    title: "Proposta Detalhada",
    description:
      "Orçamento discriminado, cronograma de obra e escolha do sistema construtivo mais adequado ao vosso caso.",
  },
  {
    number: "3",
    title: "Execução com Acompanhamento",
    description:
      "Relatório semanal com fotos. Acesso direto ao encarregado de obra. Atualização de progresso proativa.",
  },
  {
    number: "4",
    title: "Entrega & Garantia",
    description:
      "Entrega com toda a documentação técnica, certificado energético e garantia de 5 anos em estrutura.",
  },
] as const;

const BUTTON_CLASSES =
  "h-auto min-h-12 w-full rounded-md border-0 bg-white px-6 py-3 text-center text-sm font-bold text-primary shadow-sm transition-colors hover:bg-white/90 sm:px-8 sm:text-base sm:w-auto";

export function HomeProcessSteps() {
  return (
    <section
      aria-labelledby="home-process-steps-heading"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-primary px-0 py-16 text-primary-foreground md:py-20 lg:py-24"
    >
      <div
        className={cn(
          "mx-auto flex flex-col px-4 sm:px-5",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge
            className="mb-5 rounded-full border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-foreground"
            variant="outline"
          >
            Como trabalhamos
          </Badge>
          <h2
            className="text-pretty text-3xl font-bold leading-tight tracking-tight text-primary-foreground md:text-4xl lg:text-5xl"
            id="home-process-steps-heading"
          >
            Do primeiro contacto à entrega de chaves — sem surpresas.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            Um processo simples, transparente e orientado para o seu resultado.
          </p>
        </header>

        <ol className="relative mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          <span
            aria-hidden
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-white/20 lg:block"
          />

          {STEPS.map((step) => (
            <li
              className="relative flex flex-col items-center text-center"
              key={step.number}
            >
              <span
                aria-hidden
                className="relative z-10 flex size-14 items-center justify-center rounded-full border border-white/30 bg-primary text-xl font-bold text-amber-400"
              >
                {step.number}
              </span>
              <h3 className="mt-5 text-base font-bold leading-snug text-primary-foreground md:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-primary-foreground/80">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center lg:mt-16">
          <WebsiteQuoteDialog
            title="Pedido de orçamento"
            trigger={
              <Button
                className={BUTTON_CLASSES}
                type="button"
                variant="secondary"
              >
                Peça o seu orçamento
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}
