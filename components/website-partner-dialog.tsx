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

export type WebsitePartnerDialogProps = {
  trigger: ReactNode;
  /** Accessible dialog title (required for screen readers). */
  title: string;
  description?: string;
  /** Form or other body; placeholder copy is shown when omitted. */
  children?: ReactNode;
  contentClassName?: string;
};

/**
 * Shell for partner / candidatura flows. Replace the default body with a form when ready.
 */
export function WebsitePartnerDialog({
  trigger,
  title,
  description = "Brevemente poderá enviar a sua candidatura a parceiro através deste formulário.",
  children,
  contentClassName,
}: WebsitePartnerDialogProps) {
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
