import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Service = {
  readonly slug: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly badge: string;
  readonly tagline: string;
  readonly description: string;
  readonly benefits: readonly string[];
  readonly ctaLabel: string;
};

const SERVICES: readonly Service[] = [
  {
    slug: "construcao-tradicional-sustentavel",
    imageSrc: "/images/home/cts.png",
    imageAlt:
      "Alvenaria e acabamentos em obra, representativa de construção tradicional com enfoque sustentável.",
    badge: "Construção Tradicional",
    tagline: "Sólida. Familiar. Com eficiência moderna.",
    description:
      "Construção em alvenaria de tijolo ou bloco com as melhores práticas de isolamento e eficiência. A escolha de quem valoriza solidez comprovada com benefícios contemporâneos.",
    benefits: [
      "Materiais amplamente conhecidos e aprovados",
      "Excelente resistência e durabilidade",
      "Compatível com certificação A e A+",
      "Ideal para ampliações e remodelações",
    ],
    ctaLabel: "Saber mais",
  },
  {
    slug: "construcao-icf",
    imageSrc:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
    imageAlt:
      "Trabalhos de betão e estrutura em obra, alinhados com sistemas como ICF (Insulated Concrete Forms).",
    badge: "ICF — Betão Isolado",
    tagline: "Performance máxima. Poupança real a longo prazo.",
    description:
      "Insulated Concrete Forms: blocos de EPS com núcleo em betão. O sistema com maior isolamento térmico e acústico disponível. Factura energética até 60% mais baixa.",
    benefits: [
      "Certificação energética A+ garantida",
      "Insonorização superior (50+ dB)",
      "Resistência sísmica excecional",
      "Payback energético em 7-10 anos",
    ],
    ctaLabel: "Saber mais",
  },
  {
    slug: "construcao-lsf",
    imageSrc: "/images/home/lsf.png",
    imageAlt:
      "Estrutura metálica de perfis leves em obra, ilustrativa de construção em LSF (Light Steel Frame).",
    badge: "LSF — Estrutura Metálica",
    tagline: "Rápido. Preciso. Tecnologicamente superior.",
    description:
      "Light Steel Framing: estrutura em aço galvanizado de precisão milimétrica. Construção até 40% mais rápida que o método tradicional, com controlo total de prazos e custos.",
    benefits: [
      "Prazo de construção 30-40% mais curto",
      "Estrutura calculada ao milímetro (software BIM)",
      "Leveza — sem sobrecarregar fundações",
      "Ideal para ampliações e pisos adicionais",
    ],
    ctaLabel: "Saber mais",
  },
] as const;

type HomeServicesIntroProps = {
  lang: Locale;
};

export function HomeServicesIntro({ lang }: HomeServicesIntroProps) {
  return (
    <section
      aria-labelledby="home-services-heading"
      className="w-full bg-background"
      id="services"
    >
      <div
        className={cn(
          "mx-auto px-4 pb-16 sm:px-5 md:pb-20 lg:pb-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <header className="mb-10 max-w-3xl md:mb-14">
          <Badge
            className="mb-5 rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
            variant="outline"
          >
            Os nossos sistemas construtivos
          </Badge>
          <h2
            className="text-pretty text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
            id="home-services-heading"
          >
            Três abordagens. Uma garantia de qualidade.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Em cada projeto, optamos pelo sistema construtivo que melhor se
            adequa. Sempre em linha com o orçamento, prazo e objetivos de
            eficiência energética.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((service) => (
            <li className="flex" key={service.slug}>
              <Card className="flex w-full flex-col overflow-hidden rounded-xl border-border bg-card p-0 shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  <Image
                    alt={service.imageAlt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={service.imageSrc}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <Badge
                    className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
                    variant="outline"
                  >
                    {service.badge}
                  </Badge>

                  <h3 className="text-pretty text-xl font-bold leading-snug tracking-tight text-foreground md:text-2xl">
                    {service.tagline}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {service.benefits.map((benefit) => (
                      <li
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                        key={benefit}
                      >
                        <CircleCheck
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          strokeWidth={2}
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Link
                      aria-label={`${service.ctaLabel} — ${service.tagline}`}
                      className="inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      href={`/${lang}/${service.slug}`}
                    >
                      {service.ctaLabel}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
