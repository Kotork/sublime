"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  isQuoteWorkType,
  QUOTE_WORK_TYPE_OPTIONS,
  QUOTE_WORK_TYPE_PLACEHOLDER,
} from "@/lib/website-quote-form";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const quoteFormSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Indique o seu nome."),
  telefone: z
    .string()
    .trim()
    .min(9, "Indique um número de telefone válido."),
  email: z
    .string()
    .trim()
    .refine((value) => value === "" || z.string().email().safeParse(value).success, {
      message: "Indique um email válido.",
    }),
  tipoObra: z
    .string()
    .trim()
    .min(1, "Selecione o tipo de obra.")
    .refine(isQuoteWorkType, "Selecione o tipo de obra."),
  localizacao: z
    .string()
    .trim()
    .min(2, "Indique a localização da obra."),
  mensagem: z.string().trim(),
});

type QuoteFormFieldErrors = Partial<
  Record<keyof z.infer<typeof quoteFormSchema>, string>
>;

const FORM_HEADING_ID = "website-quote-form-heading";
const LABEL_CLASS =
  "text-xs font-bold uppercase tracking-wide text-primary";

export type WebsiteQuoteFormProps = {
  defaultWorkType?: string;
  privacyPolicyHref: string;
};

export function WebsiteQuoteForm({
  defaultWorkType,
  privacyPolicyHref,
}: WebsiteQuoteFormProps) {
  const formId = useId().replace(/:/g, "");
  const [errors, setErrors] = useState<QuoteFormFieldErrors>({});
  const [tipoObra, setTipoObra] = useState(
    defaultWorkType && isQuoteWorkType(defaultWorkType) ? defaultWorkType : ""
  );

  useEffect(() => {
    if (defaultWorkType && isQuoteWorkType(defaultWorkType)) {
      setTipoObra(defaultWorkType);
    }
  }, [defaultWorkType]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      nome: String(fd.get("nome") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      email: String(fd.get("email") ?? ""),
      tipoObra,
      localizacao: String(fd.get("localizacao") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    };

    const parsed = quoteFormSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        nome: fieldErrors.nome?.[0],
        telefone: fieldErrors.telefone?.[0],
        email: fieldErrors.email?.[0],
        tipoObra: fieldErrors.tipoObra?.[0],
        localizacao: fieldErrors.localizacao?.[0],
        mensagem: fieldErrors.mensagem?.[0],
      });
      return;
    }

    setErrors({});
    form.reset();
    if (defaultWorkType && isQuoteWorkType(defaultWorkType)) {
      setTipoObra(defaultWorkType);
    } else {
      setTipoObra("");
    }
    toast.success(
      "O formulário ainda não envia mensagens — integração em breve."
    );
  }

  return (
    <div>
      <header className="mb-6">
        <h3
          className="text-xl font-bold text-primary md:text-2xl"
          id={FORM_HEADING_ID}
        >
          Pedir orçamento gratuito
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Preencha o formulário e entraremos em contacto brevemente.
        </p>
      </header>

      <form
        aria-labelledby={FORM_HEADING_ID}
        id={formId}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className={LABEL_CLASS} htmlFor={`${formId}-nome`}>
              Nome *
            </Label>
            <Input
              aria-describedby={
                errors.nome ? `${formId}-nome-error` : undefined
              }
              aria-invalid={Boolean(errors.nome)}
              aria-required
              autoComplete="name"
              className="bg-input"
              id={`${formId}-nome`}
              name="nome"
              placeholder="João Silva"
            />
            {errors.nome ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-nome-error`}
                role="alert"
              >
                {errors.nome}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label className={LABEL_CLASS} htmlFor={`${formId}-telefone`}>
              Telefone *
            </Label>
            <Input
              aria-describedby={
                errors.telefone ? `${formId}-telefone-error` : undefined
              }
              aria-invalid={Boolean(errors.telefone)}
              aria-required
              autoComplete="tel"
              className="bg-input"
              id={`${formId}-telefone`}
              name="telefone"
              placeholder="912 345 678"
              type="tel"
            />
            {errors.telefone ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-telefone-error`}
                role="alert"
              >
                {errors.telefone}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label className={LABEL_CLASS} htmlFor={`${formId}-email`}>
              Email
            </Label>
            <Input
              aria-describedby={
                errors.email ? `${formId}-email-error` : undefined
              }
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              className="bg-input"
              id={`${formId}-email`}
              name="email"
              placeholder="joao@exemplo.pt"
              type="email"
            />
            {errors.email ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-email-error`}
                role="alert"
              >
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label className={LABEL_CLASS} htmlFor={`${formId}-tipoObra`}>
              Tipo de obra *
            </Label>
            <Select
              onValueChange={(value) => {
                setTipoObra(value);
                if (errors.tipoObra) {
                  setErrors((current) => ({ ...current, tipoObra: undefined }));
                }
              }}
              value={tipoObra || undefined}
            >
              <SelectTrigger
                aria-describedby={
                  errors.tipoObra ? `${formId}-tipoObra-error` : undefined
                }
                aria-invalid={Boolean(errors.tipoObra)}
                aria-required
                className="bg-input"
                id={`${formId}-tipoObra`}
              >
                <SelectValue placeholder={QUOTE_WORK_TYPE_PLACEHOLDER} />
              </SelectTrigger>
              <SelectContent>
                {QUOTE_WORK_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tipoObra ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-tipoObra-error`}
                role="alert"
              >
                {errors.tipoObra}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label className={LABEL_CLASS} htmlFor={`${formId}-localizacao`}>
              Localização *
            </Label>
            <Input
              aria-describedby={
                errors.localizacao ? `${formId}-localizacao-error` : undefined
              }
              aria-invalid={Boolean(errors.localizacao)}
              aria-required
              className="bg-input"
              id={`${formId}-localizacao`}
              name="localizacao"
              placeholder="Ex.: Coimbra, São Frutuoso"
            />
            {errors.localizacao ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-localizacao-error`}
                role="alert"
              >
                {errors.localizacao}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label className={LABEL_CLASS} htmlFor={`${formId}-mensagem`}>
            Mensagem
          </Label>
          <Textarea
            aria-describedby={
              errors.mensagem ? `${formId}-mensagem-error` : undefined
            }
            aria-invalid={Boolean(errors.mensagem)}
            className="min-h-28 bg-input"
            id={`${formId}-mensagem`}
            name="mensagem"
            placeholder="Conte-nos mais sobre o seu projeto (opcional)"
          />
          {errors.mensagem ? (
            <p
              className="text-sm text-destructive"
              id={`${formId}-mensagem-error`}
              role="alert"
            >
              {errors.mensagem}
            </p>
          ) : null}
        </div>

        <div className="mt-6">
          <Button
            className="h-12 w-full rounded-md border-0 bg-[#c9942e] text-base font-bold text-white hover:bg-[#b88428]"
            type="submit"
          >
            Enviar pedido de orçamento
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
          Ao submeter este formulário, aceita a nossa{" "}
          <Link
            className="underline underline-offset-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={privacyPolicyHref}
          >
            política de privacidade
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
