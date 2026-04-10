import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import Image from "next/image";

/** Placeholder — edifício em construção (Unsplash). */
export const SOBRE_NOS_MVV_IMAGE_SRC = "/images/sobre-nos/hero.png";

export const SOBRE_NOS_MVV_IMAGE_ALT =
  "Edifício em construção com estrutura de betão, estaleiro e equipamentos no local da obra.";

const BODY_CLASS =
  "text-pretty text-base leading-relaxed text-foreground md:text-lg";

const BLOCK_GAP = "space-y-10 md:space-y-12";

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span
        aria-hidden
        className="text-2xl font-bold tabular-nums text-primary md:text-3xl"
      >
        {index}
      </span>
      <h3 className="text-lg font-bold uppercase tracking-tight text-foreground md:text-xl">
        {title}
      </h3>
    </div>
  );
}

export function SobreNosMissionVisionValues() {
  return (
    <section
      aria-labelledby="about-us-mvv-heading"
      className="w-full bg-background"
    >
      <div
        className={cn(
          "mx-auto w-full px-4 pt-12 sm:px-5 md:pt-16 lg:pt-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2 className="sr-only" id="about-us-mvv-heading">
          Missão, visão e valores da SublimePT
        </h2>
        <div className="grid w-full min-w-0 gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <figure className="relative m-0 md:col-span-5">
            <div className="relative aspect-3/4 w-full min-w-0 overflow-hidden rounded-sm bg-muted md:aspect-4/5 md:min-h-[min(100%,560px)]">
              <Image
                alt={SOBRE_NOS_MVV_IMAGE_ALT}
                className="object-cover"
                fill
                sizes="(min-width: 768px) 38vw, 100vw"
                src={SOBRE_NOS_MVV_IMAGE_SRC}
              />
            </div>
          </figure>
          <div
            className={cn(
              "flex min-w-0 flex-col md:col-span-7",
              BLOCK_GAP,
              BODY_CLASS
            )}
          >
            <article className="space-y-4">
              <SectionHeader index="01" title="MISSÃO" />
              <p>
                Construir com excelência, inovação e responsabilidade,
                entregando projetos que superam expectativas, respeitam prazos e
                deixam uma marca positiva no ambiente e nas pessoas.
              </p>
            </article>
            <article className="space-y-4">
              <SectionHeader index="02" title="VISÃO" />
              <p>
                Ser a empresa de referência em construção sustentável na Região
                Centro de Portugal, reconhecida pela qualidade das obras, pela
                seriedade das equipas e pelo compromisso com um futuro mais
                verde.
              </p>
            </article>
            <article className="space-y-4">
              <SectionHeader index="03" title="VALORES" />
              <ul className="list-disc space-y-2 pl-6 marker:text-primary">
                <li>Qualidade (rigor em cada detalhe)</li>
                <li>Compromisso (cumprimos prazos, com total transparência)</li>
                <li>
                  Sustentabilidade (construção com menor impacto ambiental)
                </li>
                <li>Inovação (soluções modernas e mais eficientes)</li>
                <li>Pessoas (valorizamos a nossa equipa)</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
