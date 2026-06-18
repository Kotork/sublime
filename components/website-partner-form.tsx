"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { partnerContentSchema } from "@/lib/forms/schemas";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";

type PartnerFormFieldErrors = Partial<
  Record<keyof z.infer<typeof partnerContentSchema>, string>
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
  const pathname = usePathname();
  const trpc = useTRPC();
  const submit = useMutation(trpc.forms.submit.mutationOptions());
  const [errors, setErrors] = useState<PartnerFormFieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    const parsed = partnerContentSchema.safeParse(raw);
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

    try {
      await submit.mutateAsync({
        formType: "partnership",
        ...parsed.data,
        origin: pathname,
      });
      form.reset();
      toast.success(
        "Candidatura enviada com sucesso. Entraremos em contacto brevemente."
      );
    } catch {
      toast.error("Não foi possível enviar. Tente novamente.");
    }
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
              placeholder="Ex.: Coimbra, Ceira (opcional)"
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
            disabled={submit.isPending}
            type="submit"
          >
            {submit.isPending ? "A enviar…" : "Enviar candidatura"}
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
