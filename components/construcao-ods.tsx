import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HEADING_ID = "construcao-ods-heading";

type OdsItem = {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly text: string;
};

const ODS_ITEMS: readonly OdsItem[] = [
  {
    id: "7",
    imageSrc: "/images/ODS/ODS07.png",
    imageAlt:
      "Logótipo do Objetivo de Desenvolvimento Sustentável 7 das Nações Unidas: energias renováveis e acessíveis.",
    text: "Elevado desempenho energético e redução do consumo de energia.",
  },
  {
    id: "9",
    imageSrc: "/images/ODS/ODS09.png",
    imageAlt:
      "Logótipo do Objetivo de Desenvolvimento Sustentável 9 das Nações Unidas: indústria, inovação e infraestruturas.",
    text: "Sistema construtivo moderno, eficiente e industrializado.",
  },
  {
    id: "11",
    imageSrc: "/images/ODS/ODS11.png",
    imageAlt:
      "Logótipo do Objetivo de Desenvolvimento Sustentável 11 das Nações Unidas: cidades e comunidades sustentáveis.",
    text: "Sistema construtivo moderno, eficiente e industrializado.",
  },
  {
    id: "12",
    imageSrc: "/images/ODS/ODS12.png",
    imageAlt:
      "Logótipo do Objetivo de Desenvolvimento Sustentável 12 das Nações Unidas: produção e consumo sustentáveis.",
    text: "Redução de desperdício através de processos controlados.",
  },
  {
    id: "13",
    imageSrc: "/images/ODS/ODS13.png",
    imageAlt:
      "Logótipo do Objetivo de Desenvolvimento Sustentável 13 das Nações Unidas: ação climática.",
    text: "Menor pegada ambiental ao longo de todo o ciclo de construção.",
  },
] as const;

export function ConstrucaoOds() {
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
        <h2
          className="text-pretty text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          Alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS) da
          ONU
        </h2>
        <ul
          className="mt-8 grid list-none grid-cols-1 gap-8 p-0 sm:mt-10 md:mt-12 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:gap-x-14 lg:gap-y-12"
        >
          {ODS_ITEMS.map((item) => (
            <li className="flex items-start gap-4 sm:gap-5" key={item.id}>
              <div className="relative size-24 shrink-0 overflow-hidden rounded-sm sm:size-28">
                <Image
                  alt={item.imageAlt}
                  className="object-contain"
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  src={item.imageSrc}
                />
              </div>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
