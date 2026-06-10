import { Badge } from "@/components/ui/badge";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HEADING_ID = "construcao-lsf-certification-heading";

const CERTIFICATE_SRC = "/certificates/cert-lsf.png";

const CERTIFICATE_ALT =
  "Certificado do curso de Light Steel Framing da Futureng — Módulo Teórico Presencial, Cursos Certificados LSF.";

export function ConstrucaoLsfCertification() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full bg-background">
      <div
        className={cn(
          "mx-auto w-full px-4 pb-16 sm:px-5 md:pb-20 lg:pb-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:gap-16">
          <div className="flex min-w-0 flex-col md:order-1 md:col-span-2 md:self-center">
            <Badge
              className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
              variant="outline"
            >
              Competência certificada
            </Badge>
            <h2
              className="text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
              id={HEADING_ID}
            >
              Formação certificada em LSF
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
              A nossa equipa concluiu o curso certificado de Light Steel
              Framing da Futureng. O único curso certificado de LSF em
              Portugal, ministrado por um gabinete com mais de 30 anos de
              experiência no sistema. É a garantia de que a SublimePT domina o
              LSF com rigor técnico, das boas práticas de projeto à execução
              em obra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
