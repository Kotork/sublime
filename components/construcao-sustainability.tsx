import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

const HEADING_ID = "construcao-sustentabilidade-heading";

const LIST_CLASS =
  "mt-2 list-disc space-y-2 pl-5 text-pretty text-base leading-relaxed text-muted-foreground marker:text-foreground md:pl-6 md:text-lg";

export function ConstrucaoSustainability() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full bg-background">
      <div
        className={cn(
          "mx-auto w-full px-4 py-12 sm:px-5 md:py-16 lg:py-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2
          className="text-pretty text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          Sustentabilidade
        </h2>
        <div className="mt-6 space-y-12 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          <p>
            Na SublimePT, a sustentabilidade não é uma tendência, é uma
            convicção. Acreditamos que é possível construir de forma mais
            responsável, reduzindo o impacto no planeta sem comprometer a
            qualidade ou o design das obras.
          </p>
          <p>
            A nossa abordagem sustentável assenta em três pilares principais:
          </p>
        </div>
        <ul className={LIST_CLASS}>
          <li>
            Métodos construtivos de baixo impacto gerando menos desperdício em
            obra e menor pegada de carbono;
          </li>
          <li>
            Melhor eficiência energética, contribuindo para faturas mais baixas
            e menor emissão de CO2;
          </li>
          <li>
            Responsabilidade pelo ambiente local, privilegiando materiais com
            menor impacto e processos construtivos mais limpos.
          </li>
        </ul>
      </div>
    </section>
  );
}
