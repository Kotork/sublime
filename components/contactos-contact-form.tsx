"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useId, useState } from "react";
import { toast } from "sonner";

const contactFormSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "Indique pelo menos 3 caracteres."),
  telemovel: z.string().trim(),
  email: z
    .string()
    .trim()
    .min(1, "O email é obrigatório.")
    .email("Indique um email válido."),
  assunto: z.string().trim(),
  mensagem: z
    .string()
    .trim()
    .min(1, "A mensagem é obrigatória."),
});

type ContactFormFieldErrors = Partial<
  Record<keyof z.infer<typeof contactFormSchema>, string>
>;

const FORM_HEADING_ID = "contactos-form-heading";

export function ContactosContactForm() {
  const formId = useId().replace(/:/g, "");
  const [errors, setErrors] = useState<ContactFormFieldErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      nome: String(fd.get("nome") ?? ""),
      telemovel: String(fd.get("telemovel") ?? ""),
      email: String(fd.get("email") ?? ""),
      assunto: String(fd.get("assunto") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    };

    const parsed = contactFormSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        nome: fieldErrors.nome?.[0],
        telemovel: fieldErrors.telemovel?.[0],
        email: fieldErrors.email?.[0],
        assunto: fieldErrors.assunto?.[0],
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
    <div className="rounded-xl bg-gray-100 p-6 md:p-8">
      <h3
        className="sr-only"
        id={FORM_HEADING_ID}
      >
        Formulário de contacto
      </h3>
      <form
        aria-labelledby={FORM_HEADING_ID}
        id={formId}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-semibold" htmlFor={`${formId}-nome`}>
              Nome
            </Label>
            <Input
              aria-describedby={
                errors.nome ? `${formId}-nome-error` : undefined
              }
              aria-invalid={Boolean(errors.nome)}
              aria-required
              autoComplete="name"
              className="bg-background"
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
            <Label className="font-semibold" htmlFor={`${formId}-telemovel`}>
              Telemóvel
            </Label>
            <Input
              aria-describedby={
                errors.telemovel ? `${formId}-telemovel-error` : undefined
              }
              aria-invalid={Boolean(errors.telemovel)}
              autoComplete="tel"
              className="bg-background"
              id={`${formId}-telemovel`}
              name="telemovel"
              placeholder="912 345 678"
              type="tel"
            />
            {errors.telemovel ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-telemovel-error`}
                role="alert"
              >
                {errors.telemovel}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label className="font-semibold" htmlFor={`${formId}-email`}>
              Email
            </Label>
            <Input
              aria-describedby={
                errors.email ? `${formId}-email-error` : undefined
              }
              aria-invalid={Boolean(errors.email)}
              aria-required
              autoComplete="email"
              className="bg-background"
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
            <Label className="font-semibold" htmlFor={`${formId}-assunto`}>
              Assunto
            </Label>
            <Input
              aria-describedby={
                errors.assunto ? `${formId}-assunto-error` : undefined
              }
              aria-invalid={Boolean(errors.assunto)}
              className="bg-background"
              id={`${formId}-assunto`}
              name="assunto"
              placeholder="Pedido de orçamento"
            />
            {errors.assunto ? (
              <p
                className="text-sm text-destructive"
                id={`${formId}-assunto-error`}
                role="alert"
              >
                {errors.assunto}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label className="font-semibold" htmlFor={`${formId}-mensagem`}>
            Mensagem
          </Label>
          <Textarea
            aria-describedby={
              errors.mensagem ? `${formId}-mensagem-error` : undefined
            }
            aria-invalid={Boolean(errors.mensagem)}
            aria-required
            className="bg-background"
            id={`${formId}-mensagem`}
            name="mensagem"
            placeholder="Escreva aqui a sua mensagem"
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

        <div className="mt-6 flex justify-start">
          <Button type="submit" variant="default">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}
