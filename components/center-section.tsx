import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { useId } from "react";

interface CenterSectionProps {
  srTitle: string;
  description: string;
  /** Makes the section visually prominent — visible title, accent bar, larger type. */
  variant?: "default" | "featured";
  className?: string;
}

const CenterSection = ({
  srTitle,
  description,
  variant = "default",
  className,
}: CenterSectionProps) => {
  const headingId = useId().replace(/:/g, "");
  const isFeatured = variant === "featured";

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "w-full",
        isFeatured
          ? "relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 bg-secondary"
          : "bg-background",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto px-4 text-center sm:px-5",
          isFeatured ? "py-14 md:py-20 lg:py-24" : "py-16 md:py-20 lg:py-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        {isFeatured ? (
          <>
            <div
              aria-hidden
              className="mx-auto mb-6 h-1 w-14 rounded-full bg-ring md:mb-8"
            />
            <h2
              className="mx-auto max-w-2xl text-pretty text-sm font-semibold uppercase tracking-[0.15em] text-primary md:text-base"
              id={headingId}
            >
              {srTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-pretty text-lg font-medium leading-relaxed text-foreground md:mt-6 md:text-xl lg:text-2xl lg:leading-snug">
              {description}
            </p>
          </>
        ) : (
          <>
            <h2 className="sr-only" id={headingId}>
              {srTitle}
            </h2>
            <p className="mx-auto max-w-3xl text-pretty text-base leading-relaxed text-foreground md:text-lg">
              {description}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default CenterSection;
