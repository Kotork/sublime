import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import Image from "next/image";

export const SOBRE_NOS_HERO_IMAGE_SRC = "/images/sobre-nos/hero.png";

export const SOBRE_NOS_HERO_IMAGE_ALT =
  "Edifício em construção com gruas contra um céu claro, evocando construção sustentável e responsável";

const H1_ID = "sobre-nos-hero-heading";

export function SobreNosHero() {
  return (
    <section
      aria-labelledby={H1_ID}
      className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden"
    >
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full">
        <Image
          alt={SOBRE_NOS_HERO_IMAGE_ALT}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={SOBRE_NOS_HERO_IMAGE_SRC}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-white/85 via-white/55 to-white/35"
        />
        <div className="absolute inset-0 flex items-center">
          <div
            className={cn(
              "mx-auto w-full",
              WEBSITE_CONTENT_COLUMN_CLASS,
              "px-4 md:px-5 lg:px-[calc(1.5rem+2.5rem+0.75rem)] xl:px-0"
            )}
          >
            <div className="max-w-[720px] pt-24 text-left text-foreground md:pt-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600 sm:mb-4 sm:text-sm">
                SOBRE NÓS /
              </p>
              <h1
                className="text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-5xl lg:text-6xl"
                id={H1_ID}
              >
                <span className="block">CONSTRUÍMOS HOJE</span>
                <span className="block">AS CASAS RESPONSÁVEIS</span>
                <span className="block">DE AMANHÃ</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
