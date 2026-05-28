"use client";

import { WebsiteQuoteDialog } from "@/components/website-quote-dialog";
import { Button } from "@/components/ui/button";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useId, type ReactNode } from "react";

const BUTTON_CLASSES =
  "h-auto min-h-11 w-full rounded-md border-0 bg-white px-5 py-3 text-center text-sm font-bold text-primary shadow-sm transition-colors hover:bg-white/90 sm:px-6 sm:text-base md:w-auto";

export type CtaBannerProps = {
  title: string;
  /** Supporting copy below the title; improves conversion and on-page SEO when set. */
  description?: string;
  buttonLabel: string;
  /**
   * When set, the button is a link to this URL instead of opening the dialog.
   */
  href?: string;
  /** Dialog title when using the dialog CTA (defaults to `buttonLabel`). */
  dialogTitle?: string;
  dialogDescription?: string;
  dialogBody?: ReactNode;
  /** Pre-fill work type in the default quote form. */
  defaultWorkType?: string;
  /** Extra classes for the outer full-bleed strip (default: primary background). */
  className?: string;
};

export function CtaBanner({
  title,
  description,
  buttonLabel,
  href,
  dialogTitle,
  dialogDescription,
  dialogBody,
  defaultWorkType,
  className,
}: CtaBannerProps) {
  const titleId = useId().replace(/:/g, "");
  const descriptionId = useId().replace(/:/g, "");

  const button = href ? (
    <Button asChild className={BUTTON_CLASSES} variant="secondary">
      <Link href={href}>{buttonLabel}</Link>
    </Button>
  ) : (
    <WebsiteQuoteDialog
      defaultWorkType={defaultWorkType}
      description={dialogDescription}
      title={dialogTitle ?? buttonLabel}
      trigger={
        <Button className={BUTTON_CLASSES} type="button" variant="secondary">
          {buttonLabel}
        </Button>
      }
    >
      {dialogBody}
    </WebsiteQuoteDialog>
  );

  return (
    <section
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={cn(
        "relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden bg-primary px-0 py-10 text-primary-foreground sm:py-12 md:py-14",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-full flex-col gap-6 px-4 sm:px-5 md:flex-row md:items-center md:justify-between md:gap-8",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <div className="max-w-2xl text-pretty text-center md:text-left">
          <h2
            className="text-base font-semibold leading-snug sm:text-lg md:text-2xl"
            id={titleId}
          >
            {title}
          </h2>
          {description ? (
            <p
              className="mx-auto mt-2 max-w-prose text-sm leading-relaxed text-primary-foreground/90 sm:text-base md:mx-0 md:mt-3"
              id={descriptionId}
            >
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 justify-center md:justify-end">
          {button}
        </div>
      </div>
    </section>
  );
}
