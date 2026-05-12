import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";

/**
 * Centered value proposition between the hero and subsequent page sections.
 * Uses a screen-reader heading for document outline and accessibility.
 */
export function HomeValueProposition() {
  return (
    <section
      aria-labelledby="home-value-proposition-heading"
      className="w-full bg-background"
    >
      <div
        className={cn(
          "mx-auto px-4 py-16 text-center sm:px-5 md:py-20 lg:py-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2 className="sr-only" id="home-value-proposition-heading">
          Compromisso da SublimePT com a construção sustentável
        </h2>
        <p className="mx-auto max-w-3xl text-pretty text-base leading-relaxed text-foreground md:text-lg">
          Os clientes não contratam empresas. Contratam pessoas.
        </p>
      </div>
    </section>
  );
}
