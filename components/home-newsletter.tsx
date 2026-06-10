"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterContentSchema } from "@/lib/forms/schemas";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";

type NewsletterFormProps = {
  lang: Locale;
};

type NewsletterFieldErrors = Partial<
  Record<keyof z.infer<typeof newsletterContentSchema>, string>
>;

export function HomeNewsletter({ lang }: NewsletterFormProps) {
  const privacyHref = `/${lang}/politica-de-privacidade`;
  const pathname = usePathname();
  const fieldId = useId().replace(/:/g, "");
  const trpc = useTRPC();
  const submit = useMutation(trpc.forms.submit.mutationOptions());
  const [errors, setErrors] = useState<NewsletterFieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
    };

    const parsed = newsletterContentSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        nome: fieldErrors.nome?.[0],
        email: fieldErrors.email?.[0],
      });
      return;
    }

    setErrors({});

    try {
      await submit.mutateAsync({
        formType: "newsletter",
        ...parsed.data,
        origin: pathname,
      });
      form.reset();
      toast.success("Subscrição efetuada com sucesso. Obrigado!");
    } catch {
      toast.error("Não foi possível subscrever. Tente novamente.");
    }
  }

  return (
    <section
      aria-labelledby="home-newsletter-heading"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-primary"
      id="newsletter"
    >
      {/* <NewsletterBackdrop /> */}

      <div
        className={cn(
          "relative mx-auto px-4 py-16 sm:px-5 md:py-20 lg:py-24",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2
          className="mx-auto max-w-2xl text-balance text-center text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl"
          id="home-newsletter-heading"
        >
          Subscreva a nossa newsletter e mantenha-se a par das novidades.
        </h2>

        <form
          className="mx-auto mt-8 max-w-xl md:mt-10"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <div>
              <label className="sr-only" htmlFor={`${fieldId}-nome`}>
                Nome
              </label>
              <Input
                aria-describedby={
                  errors.nome ? `${fieldId}-nome-error` : undefined
                }
                aria-invalid={Boolean(errors.nome)}
                autoComplete="name"
                className="h-11 min-h-11 w-full rounded-md border-white/30 bg-white text-foreground placeholder:text-muted-foreground md:text-sm"
                id={`${fieldId}-nome`}
                name="nome"
                placeholder="O seu nome"
              />
              {errors.nome ? (
                <p
                  className="mt-1 text-sm text-white"
                  id={`${fieldId}-nome-error`}
                  role="alert"
                >
                  {errors.nome}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-2">
              <div className="min-w-0 flex-1">
                <label className="sr-only" htmlFor={`${fieldId}-email`}>
                  Endereço de email para a newsletter
                </label>
                <Input
                  aria-describedby={
                    errors.email ? `${fieldId}-email-error` : undefined
                  }
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  className="h-11 min-h-11 w-full rounded-md border-white/30 bg-white text-foreground placeholder:text-muted-foreground md:text-sm"
                  id={`${fieldId}-email`}
                  name="email"
                  placeholder="Insira o seu endereço de email"
                  type="email"
                />
                {errors.email ? (
                  <p
                    className="mt-1 text-sm text-white"
                    id={`${fieldId}-email-error`}
                    role="alert"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <Button
                className="h-11 shrink-0 rounded-md border-0 bg-white px-6 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-white/90 sm:w-auto sm:text-base"
                disabled={submit.isPending}
                type="submit"
              >
                {submit.isPending ? "A subscrever…" : "Subscrever"}
              </Button>
            </div>
          </div>
        </form>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-center text-sm text-white/80">
          Ao subscrever está a aceitar a nossa{" "}
          <Link
            className="font-bold text-white underline underline-offset-2 transition-colors hover:text-white/90"
            href={privacyHref}
          >
            política de privacidade
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function NewsletterBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Image
        alt=""
        className="object-cover"
        fill
        sizes="100vw"
        src="/images/newsletter/123.svg"
        unoptimized
      />
      <div className="absolute inset-0 bg-linear-to-br from-[#0f5e7f]/80 via-[#0f5e7f]/50 to-[#1a6b3d]/80" />
    </div>
  );
}
