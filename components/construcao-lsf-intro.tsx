"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WebsiteQuoteDialog } from "@/components/website-quote-dialog";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";

/** Aerial view of a building under construction (Unsplash). */
const SECTION_IMAGE_SRC =
  "https://images.unsplash.com/photo-1691890878510-34ed28f185fc?w=1200&q=80";

const SECTION_IMAGE_ALT =
  "Vista aérea de um edifício em construção, representativa de obra e estrutura em fase de montagem.";

const HEADING_ID = "construcao-lsf-intro-heading";

export function ConstrucaoLsfIntro() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full bg-background">
      <div
        className={cn(
          "mx-auto w-full px-4 py-12 sm:px-5 md:py-16 lg:py-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-md bg-muted">
            <Image
              alt={SECTION_IMAGE_ALT}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 1536px) 672px, 50vw"
              src={SECTION_IMAGE_SRC}
            />
          </div>
          <div className="flex min-w-0 flex-col md:self-center">
            <Badge
              className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
              variant="outline"
            >
              Light Steel Framing
            </Badge>
            <h2
              className="text-pretty text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
              id={HEADING_ID}
            >
              Construção em LSF
            </h2>
            <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-foreground md:text-lg">
              <p>
                Estrutura em aço galvanizado para obra mais rápida, leve e
                eficiente para moradias, ampliações e reabilitações no
                Distrito de Coimbra.
              </p>
              <p>
                É ideal para moradias unifamiliares, ampliações e reabilitações.
              </p>
            </div>
            <div className="mt-8">
              <WebsiteQuoteDialog
                defaultWorkType="Construção LSF"
                title="Pedir orçamento"
                trigger={
                  <Button
                    className="w-full font-bold sm:h-12 sm:w-auto sm:px-10 sm:text-base"
                    size="lg"
                    type="button"
                    variant="default"
                  >
                    Pedir orçamento
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
