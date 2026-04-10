import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ABOUT_IMAGE_SRC =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80";

const ABOUT_IMAGE_ALT =
  "Moradia moderna com linhas limpas e envolvência natural, alinhada ao tipo de projetos de construção e remodelação da SublimePT.";

const PARAGRAPHS = [
  "A SublimePT posiciona-se como uma empresa de construção civil focada em soluções sustentáveis, eficientes e adaptadas a diferentes perfis de clientes.",
  "Atuamos no segmento de obras particulares em regime de empreitada, com especial foco na construção e remodelação de moradias e edifícios multifamiliares.",
] as const;

type HomeAboutIntroProps = {
  aboutHref: string;
};

export function HomeAboutIntro({ aboutHref }: HomeAboutIntroProps) {
  return (
    <section
      aria-labelledby="home-about-intro-heading"
      className="w-full bg-background"
      id="about"
    >
      <div
        className={cn(
          "mx-auto px-4 pb-16 sm:px-5 md:pb-20 lg:pb-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2
          className="mb-8 text-left text-lg font-bold uppercase tracking-tight text-foreground md:mb-10 md:text-xl"
          id="home-about-intro-heading"
        >
          01 / SOBRE NÓS
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-none bg-muted md:aspect-auto md:min-h-[280px] lg:min-h-[320px]">
            <Image
              alt={ABOUT_IMAGE_ALT}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src={ABOUT_IMAGE_SRC}
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-4 text-left text-base leading-relaxed text-foreground md:text-lg">
              {PARAGRAPHS.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            <Link
              className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={aboutHref}
            >
              <ChevronRight
                aria-hidden
                               className="size-4 shrink-0 md:size-4.5"
                strokeWidth={2}
              />
              SABER MAIS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
