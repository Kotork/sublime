"use client";

import { Badge } from "@/components/ui/badge";
import { WebsitePartnerForm } from "@/components/website-partner-form";
import { getLocaleFromPathname } from "@/lib/utils/pathname";
import {
  Clock,
  Handshake,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

type PartnerFormGuarantee = {
  readonly icon: LucideIcon;
  readonly text: string;
};

const PARTNER_FORM_GUARANTEES: readonly PartnerFormGuarantee[] = [
  {
    icon: Handshake,
    text: "Parcerias de longo prazo baseadas na confiança",
  },
  {
    icon: Clock,
    text: "Resposta em até 5 dias úteis",
  },
  {
    icon: Star,
    text: "Avaliação criteriosa por competência e qualidade",
  },
  {
    icon: ShieldCheck,
    text: "Os seus dados estão protegidos",
  },
] as const;

export function WebsitePartnerDialogSplit() {
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
          Parceiros e Fornecedores
        </Badge>
        <h2 className="text-pretty text-2xl font-bold leading-tight tracking-tight md:text-3xl">
          Junte-se à nossa rede de parceiros.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80 md:text-base">
          Procuramos empresas e profissionais que partilhem os nossos valores
          de qualidade, inovação e compromisso. Cada candidatura é analisada com
          rigor para garantir parcerias duradouras.
        </p>
        <ul className="mt-8 space-y-5">
          {PARTNER_FORM_GUARANTEES.map((item) => {
            const Icon = item.icon;
            return (
              <li className="flex items-center gap-4" key={item.text}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                  <Icon aria-hidden className="size-5 text-white" strokeWidth={1.75} />
                </span>
                <span className="text-sm leading-relaxed text-primary-foreground md:text-base">
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="bg-background p-6 pr-10 pt-8 md:overflow-y-auto md:p-8 md:pr-10">
        <WebsitePartnerForm privacyPolicyHref={privacyPolicyHref} />
      </div>
    </div>
  );
}
