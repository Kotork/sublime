"use client";

import { WebsiteQuoteDialog } from "@/components/website-quote-dialog";
import { Button } from "@/components/ui/button";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useId, type ReactNode } from "react";

const BUTTON_CLASSES =
  "h-auto min-h-11 w-full px-5 py-3 text-center text-sm font-bold sm:px-6 sm:text-base md:w-auto";

export type CtaBannerProps = {
  title: string;
  buttonLabel: string;
  /**
   * When set, the button is a link to this URL instead of opening the dialog.
   */
  href?: string;
  /** Dialog title when using the dialog CTA (defaults to `buttonLabel`). */
  dialogTitle?: string;
  dialogDescription?: string;
  dialogBody?: ReactNode;
  /** Extra classes for the outer full-bleed strip (default: muted background). */
  className?: string;
};

export function CtaBannerAlt({
  title,
  buttonLabel,
  href,
  dialogTitle,
  dialogDescription,
  dialogBody,
  className,
}: CtaBannerProps) {
  const titleId = useId().replace(/:/g, "");

  const button = href ? (
    <Button asChild className={BUTTON_CLASSES} variant="default">
      <Link href={href}>{buttonLabel}</Link>
    </Button>
  ) : (
    <WebsiteQuoteDialog
      description={dialogDescription}
      title={dialogTitle ?? buttonLabel}
      trigger={
        <Button className={BUTTON_CLASSES} type="button" variant="default">
          {buttonLabel}
        </Button>
      }
    >
      {dialogBody}
    </WebsiteQuoteDialog>
  );

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden bg-gray-100 px-0 py-10 text-foreground sm:py-12 md:py-14",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-full flex-col gap-6 px-4 sm:px-5 md:flex-row md:items-center md:justify-between md:gap-8",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <p className="text-center text-base font-medium leading-snug text-foreground sm:text-lg md:text-left md:text-2xl">
          {title}
        </p>
        <div className="flex shrink-0 justify-center md:justify-end">
          {button}
        </div>
      </div>
    </section>
  );
}
