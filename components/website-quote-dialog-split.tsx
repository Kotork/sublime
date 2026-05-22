"use client";

import { Badge } from "@/components/ui/badge";
import { WebsiteQuoteForm } from "@/components/website-quote-form";
import { getLocaleFromPathname } from "@/lib/utils/pathname";
import {
  Clock,
  FileCheck,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

type QuoteFormGuarantee = {
  readonly icon: LucideIcon;
  readonly text: string;
};

const QUOTE_FORM_GUARANTEES: readonly QuoteFormGuarantee[] = [
  {
    icon: Clock,
    text: "Resposta em até 24 horas úteis",
  },
  {
    icon: MapPin,
    text: "Visita ao local totalmente gratuita",
  },
  {
    icon: FileCheck,
    text: "Orçamento detalhado sem compromisso",
  },
  {
    icon: ShieldCheck,
    text: "Os seus dados estão protegidos",
  },
] as const;

export type WebsiteQuoteDialogSplitProps = {
  defaultWorkType?: string;
};

export function WebsiteQuoteDialogSplit({
  defaultWorkType,
}: WebsiteQuoteDialogSplitProps) {
  const pathname = usePathname();
  const lang = getLocaleFromPathname(pathname);
  const privacyPolicyHref = `/${lang}/politica-de-privacidade`;

  return (
    <div className="grid max-h-[90vh] grid-cols-1 overflow-y-auto md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:overflow-hidden">
      <aside className="bg-primary p-6 text-primary-foreground md:p-8">
        <Badge
          className="mb-5 rounded-full border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-foreground"
          variant="outline"
        >
          Orçamento gratuito
        </Badge>
        <h2 className="text-pretty text-2xl font-bold leading-tight tracking-tight md:text-3xl">
          Fale connosco. Sem compromisso.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80 md:text-base">
          Respondemos em menos de 2 horas úteis. A primeira reunião é sempre
          presencial, na vossa localização porque acreditamos que boas obras
          começam com um bom encontro.
        </p>
        <ul className="mt-8 space-y-5">
          {QUOTE_FORM_GUARANTEES.map((item) => {
            const Icon = item.icon;
            return (
              <li className="flex items-center gap-4" key={item.text}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                  <Icon aria-hidden className="size-5 text-white" strokeWidth={1.75} />
                </span>
                <span className="text-sm leading-relaxed text-primary-foreground/90 md:text-base">
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="bg-background p-6 pr-10 pt-8 md:overflow-y-auto md:p-8 md:pr-10">
        <WebsiteQuoteForm
          defaultWorkType={defaultWorkType}
          privacyPolicyHref={privacyPolicyHref}
        />
      </div>
    </div>
  );
}
