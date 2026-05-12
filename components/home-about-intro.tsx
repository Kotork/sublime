import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import {
  FileCheck,
  Handshake,
  Leaf,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ABOUT_IMAGE_SRC =
  "https://images.unsplash.com/photo-1558227691-41ea78d1f631?w=1200&q=80";

const ABOUT_IMAGE_ALT =
  "Trabalhadores da construção civil com ferramentas, evocando presença em obra e relação humana no projeto.";

const QUOTE = "Os clientes não contratam empresas. Contratam pessoas.";

type Value = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
};

const VALUES: readonly Value[] = [
  {
    icon: Handshake,
    title: "Transparência total",
    description:
      "Relatório semanal de progresso. Sem surpresas de custos. Prazo escrito no contrato.",
  },
  {
    icon: FileCheck,
    title: "Rigor técnico comprovado",
    description:
      "Todos os projetos cumprem regulamentação RCCTE, REH e normas europeias em vigor.",
  },
  {
    icon: Leaf,
    title: "Construção responsável",
    description:
      "Materiais certificados, soluções de eficiência energética e mínimo impacto ambiental.",
  },
] as const;

const FOUNDER = {
  initials: "JF",
  name: "Jose Ferramenta",
  title: "Fundador & Diretor Técnico, SublimePT",
  linkedinUrl: "https://www.linkedin.com/in/jose-ferramenta-17979569/",
} as const;

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-muted md:aspect-auto md:min-h-[480px]">
            <Image
              alt={ABOUT_IMAGE_ALT}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src={ABOUT_IMAGE_SRC}
            />

            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-br from-[#0f5e7f]/85 via-[#0f5e7f]/60 to-[#1a6b3d]/85"
            />

            <figure className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
              <blockquote className="relative max-w-xs rounded-md bg-[#c9942e]/95 p-4 text-white shadow-md md:max-w-sm md:p-5">
                <span
                  aria-hidden
                  className="absolute left-3 top-2 font-serif text-2xl leading-none text-white/80 md:text-3xl"
                >
                  &ldquo;
                </span>
                <p className="pl-5 text-sm font-medium italic leading-snug md:text-base">
                  {QUOTE}
                </p>
              </blockquote>
            </figure>
          </div>

          <div className="flex flex-col">
            <Badge
              className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
              variant="outline"
            >
              Quem somos
            </Badge>

            <h2
              className="text-pretty text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
              id="home-about-intro-heading"
            >
              A empresa somos nós e isso faz toda a diferença.
            </h2>

            <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Construir uma casa é a maior decisão financeira da maioria das
              famílias. Acreditamos que esse momento exige um acompanhamento
              humano e direto. Ao contratar a SublimePT, sabe com quem fala,
              quem está em obra e quem é responsável.
            </p>

            <ul className="mt-8 space-y-5">
              {VALUES.map((value) => {
                const Icon = value.icon;
                return (
                  <li className="flex items-start gap-4" key={value.title}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold leading-snug text-foreground md:text-base">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              aria-label={`Ver perfil de ${FOUNDER.name} no LinkedIn`}
              className="mt-8 flex items-center gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={FOUNDER.linkedinUrl}
              rel="noreferrer"
              target="_blank"
            >
              <span
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
              >
                {FOUNDER.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">
                  {FOUNDER.name}
                </p>
                <p className="truncate text-xs text-muted-foreground md:text-sm">
                  {FOUNDER.title}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-primary md:text-sm">
                <svg
                  aria-hidden
                  className="size-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.356V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </span>
            </Link>

            {aboutHref ? (
              <Link
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                href={aboutHref}
              >
                Saber mais sobre nós
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
