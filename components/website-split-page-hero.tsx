import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import Image from "next/image";

const HERO_INNER_PADDING =
  "px-4 md:px-5 lg:px-[calc(1.5rem+2.5rem+0.75rem)] xl:px-0";

const EYEBROW_CLASS =
  "mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600 sm:mb-4 sm:text-sm";

const TITLE_CLASS =
  "block text-2xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-3xl md:text-5xl lg:text-6xl";

export type WebsiteSplitPageHeroProps = {
  eyebrow: string;
  /** First line sits on the image (bottom); remaining lines on solid background. */
  titleLines: readonly [string, string, ...string[]];
  imageSrc: string;
  imageAlt: string;
  headingId: string;
  priority?: boolean;
};

export function WebsiteSplitPageHero({
  eyebrow,
  titleLines,
  imageSrc,
  imageAlt,
  headingId,
  priority = true,
}: WebsiteSplitPageHeroProps) {
  const [firstTitleLine, ...otherTitleLines] = titleLines;

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden"
    >
      <h1 className="m-0 p-0 font-[inherit]" id={headingId}>
        <div className="relative w-full">
          <Image
            alt={imageAlt}
            className="object-cover"
            draggable={false}
            fill
            priority={priority}
            sizes="100vw"
            src={imageSrc}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-amber-950/30 via-stone-900/20 to-stone-900/40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/70 via-white/45 to-white/55"
          />
          <div className="relative z-10">
            <div
              className={cn(
                "mx-auto w-full",
                WEBSITE_CONTENT_COLUMN_CLASS,
                HERO_INNER_PADDING
              )}
            >
              <div
                className={cn(
                  "flex min-h-[280px] flex-col text-left sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]",
                  "max-w-[720px] pt-24 md:pt-8"
                )}
              >
                <div
                  aria-hidden
                  className="min-h-28 flex-1 sm:min-h-36 md:min-h-44"
                />
                <p className={EYEBROW_CLASS}>{eyebrow}</p>
                <span className={TITLE_CLASS}>{firstTitleLine}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-background">
          <div
            className={cn(
              "mx-auto w-full",
              WEBSITE_CONTENT_COLUMN_CLASS,
              HERO_INNER_PADDING
            )}
          >
            <div className="max-w-[720px]">
              {otherTitleLines.map((line, index) => (
                <span
                  className={TITLE_CLASS}
                  key={`${headingId}-line-${index + 1}`}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </h1>
    </section>
  );
}
