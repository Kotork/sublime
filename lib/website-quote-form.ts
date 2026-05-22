export const QUOTE_WORK_TYPE_OPTIONS = [
  "Construção LSF",
  "Construção ICF",
  "Construção Tradicional Sustentável",
  "Outro",
] as const;

export type QuoteWorkType = (typeof QUOTE_WORK_TYPE_OPTIONS)[number];

export const QUOTE_WORK_TYPE_PLACEHOLDER = "Selecionar tipo de obra";

export const QUOTE_FORM_GUARANTEES = [
  {
    accentClass: "bg-amber-400",
    text: "Resposta em até 24 horas úteis",
  },
  {
    accentClass: "bg-orange-400",
    text: "Visita ao local totalmente gratuita",
  },
  {
    accentClass: "bg-rose-400",
    text: "Orçamento detalhado sem compromisso",
  },
  {
    accentClass: "bg-emerald-400",
    text: "Os seus dados estão protegidos (RGPD)",
  },
] as const;

export function isQuoteWorkType(value: string): value is QuoteWorkType {
  return (QUOTE_WORK_TYPE_OPTIONS as readonly string[]).includes(value);
}
