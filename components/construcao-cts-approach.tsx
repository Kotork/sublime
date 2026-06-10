import { Badge } from "@/components/ui/badge";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

const HEADING_ID = "construcao-cts-approach-heading";

export function ConstrucaoCtsApproach() {
  return (
    <section aria-labelledby={HEADING_ID} className="w-full">
      <div
        className={cn(
          "mx-auto w-full px-4 pb-12 sm:px-5 md:pb-16 lg:pb-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <Badge
          className="mb-5 self-start rounded-full border-border bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
          variant="outline"
        >
          A nossa abordagem
        </Badge>
        <h2
          className="text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          Tradição e inovação - combinação de sistemas
        </h2>
        <p className="mt-6 max-w-4xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          A construção convencional combina-se naturalmente com o LSF e o ICF.
          Numa reabilitação, mantemos e reforçamos a estrutura existente e
          podemos ampliar em LSF; numa obra nova, escolhemos o sistema, ou a
          combinação, que melhor serve o projeto.
        </p>
      </div>
    </section>
  );
}
