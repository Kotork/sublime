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
import { WebsitePartnerDialogSplit } from "@/components/website-partner-dialog-split";
import { cn } from "@/lib/utils";

export type WebsitePartnerDialogProps = {
  trigger: ReactNode;
  /** Accessible dialog title (required for screen readers). */
  title: string;
  description?: string;
  /** Form or other body; split partner form is shown when omitted. */
  children?: ReactNode;
  contentClassName?: string;
};

/**
 * Shell for partner / candidatura flows. Pass a `trigger` (usually a button).
 * Renders the split partner form by default; pass `children` to override the body.
 */
export function WebsitePartnerDialog({
  trigger,
  title,
  description,
  children,
  contentClassName,
}: WebsitePartnerDialogProps) {
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
                  Preencha o formulário para enviar a sua candidatura a parceiro.
                </DialogDescription>
              )}
            </DialogHeader>
            <WebsitePartnerDialogSplit />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
