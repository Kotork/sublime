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
import { cn } from "@/lib/utils";

export type WebsiteQuoteDialogProps = {
  trigger: ReactNode;
  /** Accessible dialog title (required for screen readers). */
  title: string;
  description?: string;
  /** Form or other body; placeholder copy is shown when omitted. */
  children?: ReactNode;
  contentClassName?: string;
};

/**
 * Reusable shell for quote / contact flows. Pass a `trigger` (usually a button)
 * and later replace the default body with a form.
 */
export function WebsiteQuoteDialog({
  trigger,
  title,
  description = "Brevemente poderá enviar o seu pedido através deste formulário.",
  children,
  contentClassName,
}: WebsiteQuoteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(contentClassName)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children ?? (
          <p className="text-sm text-muted-foreground">
            Formulário em preparação.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
