import { Badge } from "@/components/ui/badge";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

const HEADING_ID = "construcao-icf-approach-heading";

export function ConstrucaoIcfApproach() {
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
          O sistema certo com a combinação certa
        </h2>
        <p className="mt-6 max-w-4xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          O ICF não compete com os outros sistemas: complementa-os. Combinamos o
          betão isolado, o LSF e a construção convencional conforme o que cada
          parte da obra exige. Propomos sempre a solução, única ou combinada,
          mais adequada ao seu projeto.
        </p>
      </div>
    </section>
  );
}
