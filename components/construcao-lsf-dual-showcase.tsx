import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HEADING_ID = "construcao-lsf-showcase-heading";

/** Interior metal stud / framing — residential-scale LSF context (Unsplash). */
const SHOWCASE_LEFT_SRC =
  "https://images.unsplash.com/photo-1768321911446-baeb6c1a673f?w=1200&q=80";

const SHOWCASE_LEFT_ALT =
  "Vista interior de um edifício em construção com estrutura metálica e perfis de enquadramento, ilustrativa de construção leve em aço (LSF) em contexto residencial.";

/** Large-scale steel framework against sky — industrial / engineered steel (Unsplash). */
const SHOWCASE_RIGHT_SRC =
  "https://images.unsplash.com/photo-1706552128399-43e2baff0fe5?w=1200&q=80";

const SHOWCASE_RIGHT_ALT =
  "Estrutura metálica de grande dimensão em obra, vista de baixo para cima com céu azul de fundo, ilustrativa de engenharia e montagem estrutural em aço.";

export function ConstrucaoLsfDualShowcase() {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="w-full bg-background"
    >
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
