export const QUOTE_WORK_TYPE_OPTIONS = [
  "Construção LSF",
  "Construção ICF",
  "Construção Tradicional Sustentável",
  "Outro",
] as const;

export type QuoteWorkType = (typeof QUOTE_WORK_TYPE_OPTIONS)[number];

export const QUOTE_WORK_TYPE_PLACEHOLDER = "Selecionar tipo de obra";

export function isQuoteWorkType(value: string): value is QuoteWorkType {
  return (QUOTE_WORK_TYPE_OPTIONS as readonly string[]).includes(value);
}
