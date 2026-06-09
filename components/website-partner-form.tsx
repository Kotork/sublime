"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const partnerFormSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Indique o seu nome."),
  empresa: z
    .string()
    .trim()
    .min(2, "Indique o nome da empresa."),
  nif: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s/g, ""))
    .refine((value) => /^\d{9}$/.test(value), {
      message: "Indique um NIF válido (9 dígitos).",
    }),
  email: z
    .string()
    .trim()
    .min(1, "O email é obrigatório.")
    .email("Indique um email válido."),
  telefone: z
    .string()
    .trim()
    .min(9, "Indique um número de telefone válido."),
  localizacao: z.string().trim(),
  mensagem: z.string().trim(),
});

type PartnerFormFieldErrors = Partial<
  Record<keyof z.infer<typeof partnerFormSchema>, string>
>;

const FORM_HEADING_ID = "website-partner-form-heading";
const LABEL_CLASS =
  "text-xs font-bold uppercase tracking-wide text-primary";

export type WebsitePartnerFormProps = {
  privacyPolicyHref: string;
};

export function WebsitePartnerForm({
  privacyPolicyHref,
}: WebsitePartnerFormProps) {
  const formId = useId().replace(/:/g, "");
  const [errors, setErrors] = useState<PartnerFormFieldErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      nome: String(fd.get("nome") ?? ""),
      empresa: String(fd.get("empresa") ?? ""),
      nif: String(fd.get("nif") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      localizacao: String(fd.get("localizacao") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    };

    const parsed = partnerFormSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        nome: fieldErrors.nome?.[0],
        empresa: fieldErrors.empresa?.[0],
        nif: fieldErrors.nif?.[0],
        email: fieldErrors.email?.[0],
        telefone: fieldErrors.telefone?.[0],
        localizacao: fieldErrors.localizacao?.[0],
        mensagem: fieldErrors.mensagem?.[0],
      });
      return;
    }

    setErrors({});
    form.reset();
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
          Candidatura a parceiro
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Preencha o formulário e analisaremos a sua candidatura brevemente.
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
            <Label className={LABEL_CLASS} htmlFor={`${formId}-empresa`}>
              Empresa *
            </Label>
            <Input
              aria-describedby={
                errors.empresa ? `${formId}-empresa-error` : undefined
              }
              aria-invalid={Boolean(errors.empresa)}
              aria-required
              autoComplete="organization"
              className="bg-input"
              id={`${formId}-empresa`}
              name="empresa"
              placeholder="Empresa Lda."
            />
            {errors.empresa ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-empresa-error`}
                role="alert"
              >
                {errors.empresa}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label className={LABEL_CLASS} htmlFor={`${formId}-nif`}>
              NIF *
            </Label>
            <Input
              aria-describedby={errors.nif ? `${formId}-nif-error` : undefined}
              aria-invalid={Boolean(errors.nif)}
              aria-required
              className="bg-input"
              id={`${formId}-nif`}
              inputMode="numeric"
              name="nif"
              placeholder="123456789"
            />
            {errors.nif ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-nif-error`}
                role="alert"
              >
                {errors.nif}
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
              Email *
            </Label>
            <Input
              aria-describedby={
                errors.email ? `${formId}-email-error` : undefined
              }
              aria-invalid={Boolean(errors.email)}
              aria-required
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

          <div className="space-y-2 sm:col-span-2">
            <Label className={LABEL_CLASS} htmlFor={`${formId}-localizacao`}>
              Localização
            </Label>
            <Input
              aria-describedby={
                errors.localizacao ? `${formId}-localizacao-error` : undefined
              }
              aria-invalid={Boolean(errors.localizacao)}
              className="bg-input"
              id={`${formId}-localizacao`}
              name="localizacao"
              placeholder="Ex.: Coimbra, São Frutuoso (opcional)"
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
            placeholder="Conte-nos mais sobre a sua empresa e área de atuação (opcional)"
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
            className="h-12 w-full rounded-md border-0 bg-tertiary text-base font-bold text-white hover:bg-tertiary/90"
            type="submit"
          >
            Enviar candidatura
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
