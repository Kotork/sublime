import { Badge } from "@/components/ui/badge";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

const CERTIFICATION_HEADING_ID = "construcao-lsf-certification-heading";
const PARTNERS_HEADING_ID = "construcao-lsf-partners-heading";

const COLUMN_TITLE_CLASS =
  "text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl";

const COLUMN_BODY_CLASS =
  "mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg";

export function ConstrucaoLsfCertification() {
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
              Formação certificada em LSF
            </h2>
            <p className={COLUMN_BODY_CLASS}>
              A nossa equipa concluiu o curso certificado de Light Steel Framing
              da Futureng. O único curso certificado de LSF em Portugal,
              ministrado por um gabinete com mais de 30 anos de experiência no
              sistema. É a garantia de que a SublimePT domina o LSF com rigor
              técnico, das boas práticas de projeto à execução em obra.
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
              Trabalhamos com marcas de referência no sistema LSF, como{" "}
              <b>Knauf</b> e <b>Saint-Gobain</b>, para assegurar materiais
              certificados em cada obra. As marcas que utilizamos para cada obra
              são selecionadas com base na sua qualidade, durabilidade e
              sustentabilidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
