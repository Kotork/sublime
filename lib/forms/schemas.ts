import { z } from "zod";

import { isQuoteWorkType } from "@/lib/website-quote-form";

export const FORM_TYPES = [
  "quote",
  "newsletter",
  "partnership",
  "contact",
] as const;

export type FormTypeName = (typeof FORM_TYPES)[number];

const nameMin2 = z.string().trim().min(2, "Indique o seu nome.");
const nameMin3 = z.string().trim().min(3, "Indique pelo menos 3 caracteres.");
const phoneRequired = z
  .string()
  .trim()
  .min(9, "Indique um número de telefone válido.");
const emailRequired = z
  .string()
  .trim()
  .min(1, "O email é obrigatório.")
  .email("Indique um email válido.");
const emailOptional = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.string().email().safeParse(value).success,
    { message: "Indique um email válido." }
  );
const optionalText = z.string().trim().optional();

const nif = z
  .string()
  .trim()
  .transform((value) => value.replace(/\s/g, ""))
  .refine((value) => /^\d{9}$/.test(value), {
    message: "Indique um NIF válido (9 dígitos).",
  });

/**
 * Per-form "content" schemas (no formType / origin). These are shared with the
 * client form components so validation stays identical on both sides.
 */
export const quoteContentSchema = z.object({
  nome: nameMin2,
  telefone: phoneRequired,
  email: emailOptional,
  tipoObra: z
    .string()
    .trim()
    .min(1, "Selecione o tipo de obra.")
    .refine(isQuoteWorkType, "Selecione o tipo de obra."),
  localizacao: z.string().trim().min(2, "Indique a localização da obra."),
  mensagem: optionalText,
});

export const newsletterContentSchema = z.object({
  nome: nameMin2,
  email: emailRequired,
});

export const partnerContentSchema = z.object({
  nome: nameMin2,
  empresa: z.string().trim().min(2, "Indique o nome da empresa."),
  nif,
  telefone: phoneRequired,
  email: emailRequired,
  localizacao: optionalText,
  mensagem: optionalText,
});

export const contactContentSchema = z.object({
  nome: nameMin3,
  telemovel: optionalText,
  email: emailRequired,
  assunto: optionalText,
  mensagem: z.string().trim().min(1, "A mensagem é obrigatória."),
});

const origin = z.string().trim().min(1);

/**
 * Server-side input for the `forms.submit` mutation. Discriminated by
 * `formType`; each variant extends the matching content schema with origin.
 */
export const submitFormInputSchema = z.discriminatedUnion("formType", [
  quoteContentSchema.extend({ formType: z.literal("quote"), origin }),
  newsletterContentSchema.extend({ formType: z.literal("newsletter"), origin }),
  partnerContentSchema.extend({ formType: z.literal("partnership"), origin }),
  contactContentSchema.extend({ formType: z.literal("contact"), origin }),
]);

export type SubmitFormInput = z.infer<typeof submitFormInputSchema>;
