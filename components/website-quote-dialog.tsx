"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WebsiteQuoteDialogSplit } from "@/components/website-quote-dialog-split";
import { cn } from "@/lib/utils";

export type WebsiteQuoteDialogProps = {
  trigger: ReactNode;
  /** Accessible dialog title (required for screen readers). */
  title: string;
  description?: string;
  /** Pre-fill the work type dropdown when opened from a service page. */
  defaultWorkType?: string;
  /** Form or other body; split quote form is shown when omitted. */
  children?: ReactNode;
  contentClassName?: string;
};

/**
 * Reusable shell for quote / contact flows. Pass a `trigger` (usually a button).
 * Renders the split quote form by default; pass `children` to override the body.
 */
export function WebsiteQuoteDialog({
  trigger,
  title,
  description,
  defaultWorkType,
  children,
  contentClassName,
}: WebsiteQuoteDialogProps) {
  const hasCustomBody = children !== undefined;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          hasCustomBody
            ? undefined
            : "max-h-[90vh] max-w-5xl gap-0 overflow-hidden p-0 sm:rounded-xl [&>button]:z-10 [&>button]:text-primary-foreground md:[&>button]:text-muted-foreground",
          contentClassName
        )}
      >
        {hasCustomBody ? (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description ? (
                <DialogDescription>{description}</DialogDescription>
              ) : null}
            </DialogHeader>
            {children}
          </>
        ) : (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>{title}</DialogTitle>
              {description ? (
                <DialogDescription>{description}</DialogDescription>
              ) : (
                <DialogDescription>
                  Preencha o formulário para pedir um orçamento gratuito.
                </DialogDescription>
              )}
            </DialogHeader>
            <WebsiteQuoteDialogSplit defaultWorkType={defaultWorkType} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
