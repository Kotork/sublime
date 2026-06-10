import { Badge } from "@/components/ui/badge";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

const HEADING_ID = "construcao-icf-region-heading";

const WHATSAPP_HREF = "https://wa.me/351963412090";

const WHATSAPP_LINK_CLASS =
  "font-bold text-primary underline underline-offset-4 transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm";

export function ConstrucaoIcfRegion() {
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
          Distrito de Coimbra
        </Badge>
        <h2
          className="text-pretty text-xl font-bold tracking-tight text-foreground md:text-2xl"
          id={HEADING_ID}
        >
          ICF no Centro de Portugal
        </h2>
        <p className="mt-6 max-w-4xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          [Placeholder] A SublimePT traz construção em betão isolado (ICF) ao
          Distrito de Coimbra, com o rigor de quem domina a construção e a
          reabilitação. Procura uma casa, ampliação ou reabilitação em ICF?{" "}
          <a
            className={WHATSAPP_LINK_CLASS}
            href={WHATSAPP_HREF}
            rel="noopener noreferrer"
            target="_blank"
          >
            Fale connosco
          </a>
          .
        </p>
      </div>
    </section>
  );
}
