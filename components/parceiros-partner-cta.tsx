"use client";

import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { WebsitePartnerDialog } from "@/components/website-partner-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HEADING_ID = "parceiros-partner-cta-heading";

const PARTNER_EMAIL = "info@sublime-pt.com";

export function ParceirosPartnerCta() {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="w-full bg-background py-16 md:py-20 lg:py-24"
    >
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-5",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <div className="mx-auto text-left">
          <Badge
            className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
            variant="outline"
          >
            Parceiros e Fornecedores
          </Badge>
          <h2
            className="text-pretty text-lg font-bold uppercase tracking-tight text-foreground md:text-xl"
            id={HEADING_ID}
          >
            QUER TORNAR-SE NOSSO PARCEIRO?
          </h2>
          <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-foreground md:mt-8 md:text-lg">
            <p>
              Se a sua empresa partilha os valores da SublimePT e pretende
              estabelecer uma parceria de longo prazo, gostaríamos de o conhecer.
              Procuramos empresas e profissionais que se destaquem pela
              qualidade do trabalho, pelo cumprimento de compromissos e pela
              orientação para o cliente.
            </p>
            <p>
              Entre em contacto connosco através de{" "}
              <a
                className="font-bold text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                href={`mailto:${PARTNER_EMAIL}`}
              >
                {PARTNER_EMAIL}
              </a>{" "}
              ou preencha o formulário disponível no website. Entraremos em
              contacto brevemente.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <WebsitePartnerDialog
            title="Candidatura a parceiro"
            trigger={
              <Button
                className="font-bold sm:h-12 sm:px-10 sm:text-base"
                size="lg"
                type="button"
                variant="default"
              >
                Quero ser parceiro
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}
