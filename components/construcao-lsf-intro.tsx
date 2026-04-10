"use client";

import { WebsiteQuoteDialog } from "@/components/website-quote-dialog";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";

/** Distinct from hero art; steel / light-frame construction context. */
const SECTION_IMAGE_SRC =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80";

const SECTION_IMAGE_ALT =
  "Estrutura metálica em perfis de aço galvanizado em obra, representativa de Light Steel Framing (LSF).";

const HEADING_ID = "construcao-lsf-intro-heading";

const CTA_CLASS =
  "inline-flex h-11 w-full items-center justify-center rounded-md bg-[#165A72] px-8 text-sm font-bold text-white transition-colors hover:bg-[#124a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-12 sm:w-auto sm:px-10 sm:text-base";

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
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
            <Image
              alt={SECTION_IMAGE_ALT}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 1536px) 672px, 50vw"
              src={SECTION_IMAGE_SRC}
            />
          </div>
          <div className="flex flex-col gap-5 md:gap-6">
            <h2
              className="text-pretty text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
              id={HEADING_ID}
            >
              LSF (LIGHT STEEL FRAMING)
            </h2>
            <div className="space-y-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                O Light Steel Framing é um sistema construtivo industrializado
                que utiliza perfis de aço galvanizado de alta resistência como
                estrutura principal. É uma solução leve, rápida e altamente
                eficiente do ponto de vista energético.
              </p>
              <p>
                É ideal para moradias unifamiliares, ampliações e reabilitações.
              </p>
            </div>
            <div className="pt-1">
              <WebsiteQuoteDialog
                title="Pedir orçamento"
                trigger={
                  <button className={CTA_CLASS} type="button">
                    Pedir orçamento
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
