import { Badge } from "@/components/ui/badge";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

const CERTIFICATION_HEADING_ID = "construcao-cts-certification-heading";
const PARTNERS_HEADING_ID = "construcao-cts-partners-heading";

const COLUMN_TITLE_CLASS =
  "text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl";

const COLUMN_BODY_CLASS =
  "mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg";

export function ConstrucaoCtsCertification() {
  return (
    <section
      aria-labelledby={CERTIFICATION_HEADING_ID}
      className="w-full bg-background"
    >
      <div
        className={cn(
          "mx-auto w-full px-4 pb-16 sm:px-5 md:pb-20 lg:pb-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex min-w-0 flex-col">
            <Badge
              className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
              variant="outline"
            >
              Garantia de qualidade
            </Badge>
            <h2 className={COLUMN_TITLE_CLASS} id={CERTIFICATION_HEADING_ID}>
              Experiência em obra convencional
            </h2>
            <p className={COLUMN_BODY_CLASS}>
              A nossa equipa acumula experiência em construção e reabilitação em
              alvenaria, com rigor técnico desde o projeto até à execução em
              obra. Garantimos boas práticas construtivas, controlo de qualidade
              e documentação técnica completa em cada entrega.
            </p>
          </div>

          <div
            aria-labelledby={PARTNERS_HEADING_ID}
            className="flex min-w-0 flex-col"
            role="group"
          >
            <Badge
              aria-hidden
              className="mb-5 hidden self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground md:inline-flex invisible pointer-events-none"
              variant="outline"
            >
              Garantia de qualidade
            </Badge>
            <h2 className={COLUMN_TITLE_CLASS} id={PARTNERS_HEADING_ID}>
              Parceiros e materiais
            </h2>
            <p className={COLUMN_BODY_CLASS}>
              Trabalhamos com fornecedores e marcas de referência em materiais de
              construção, isolamento e acabamentos, selecionados com base na
              qualidade, durabilidade e sustentabilidade. As soluções de cada
              obra são definidas em função do projeto e dos requisitos de
              desempenho.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
