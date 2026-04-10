import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";

interface CenterSectionProps {
  srTitle: string;
  description: string;
}

const CenterSection = ({ srTitle, description }: CenterSectionProps) => {
  return (
    <section
      aria-labelledby="about-us-value-proposition-heading"
      className="w-full bg-background"
    >
      <div
        className={cn(
          "mx-auto px-4 py-16 text-center sm:px-5 md:py-20 lg:py-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2 className="sr-only" id="about-us-value-proposition-heading">
          {srTitle}
        </h2>
        <p className="mx-auto max-w-3xl text-pretty text-base leading-relaxed text-foreground md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
};

export default CenterSection;
