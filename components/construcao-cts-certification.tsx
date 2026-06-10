import { Badge } from "@/components/ui/badge";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

const HEADING_ID = "construcao-cts-partners-heading";

const COLUMN_TITLE_CLASS =
  "text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl";

const COLUMN_BODY_CLASS =
  "mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg";

export function ConstrucaoCtsCertification() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full bg-background">
      <div
        className={cn(
          "mx-auto w-full px-4 pb-16 sm:px-5 md:pb-20 lg:pb-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <Badge
          className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
          variant="outline"
        >
          Garantia de qualidade
        </Badge>
        <h2 className={COLUMN_TITLE_CLASS} id={HEADING_ID}>
          Parceiros e materiais
        </h2>
        <div className={cn(COLUMN_BODY_CLASS, "max-w-4xl space-y-4")}>
          <p>
            Trabalhamos com marcas de referência, como <b>Cimpor/Secil</b>,{" "}
            <b>Weber</b> e <b>Saint-Gobain</b>, <b>Fassa Bortolo</b> e{" "}
            <b>Mapei</b> para assegurar materiais certificados em cada obra.
          </p>
          <p>
            As marcas que utilizamos para cada obra são selecionadas com base na
            sua qualidade, durabilidade e sustentabilidade.
          </p>
        </div>
      </div>
    </section>
  );
}
