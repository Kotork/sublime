import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HEADING_ID = "construcao-lsf-showcase-heading";

/** Interior metal stud / framing — residential-scale LSF context (Unsplash). */
const SHOWCASE_LEFT_SRC = "/images/services/lsf/detail1.png";

const SHOWCASE_LEFT_ALT =
  "Vista interior de um edifício em construção com estrutura metálica e perfis de enquadramento, ilustrativa de construção leve em aço (LSF) em contexto residencial.";

/** Aerial view of a construction site with concrete blocks (Unsplash). */
const SHOWCASE_RIGHT_SRC =
  "https://images.unsplash.com/photo-1686358244616-aed9e9a1d827?w=1200&q=80";

const SHOWCASE_RIGHT_ALT =
  "Vista aérea de um estaleiro de construção com blocos de betão, ilustrativa de obra e preparação de estruturas em contexto de construção.";

export function ConstrucaoLsfDualShowcase() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full bg-background">
      <div
        className={cn(
          "mx-auto w-full px-4 pb-12 sm:px-5 md:pb-16 lg:pb-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2 className="sr-only" id={HEADING_ID}>
          Exemplos visuais de estruturas em aço e LSF em obra
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          <figure className="m-0">
            <div className="relative aspect-3/2 w-full overflow-hidden rounded-md bg-muted">
              <Image
                alt={SHOWCASE_LEFT_ALT}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={SHOWCASE_LEFT_SRC}
              />
            </div>
          </figure>
          <figure className="m-0">
            <div className="relative aspect-3/2 w-full overflow-hidden rounded-md bg-muted">
              <Image
                alt={SHOWCASE_RIGHT_ALT}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={SHOWCASE_RIGHT_SRC}
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
