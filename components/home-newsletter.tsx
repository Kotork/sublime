"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type HomeNewsletterProps = {
  lang: Locale;
};

export function HomeNewsletter({ lang }: HomeNewsletterProps) {
  const privacyHref = `/${lang}/politica-de-privacidade`;

  return (
    <section
      aria-labelledby="home-newsletter-heading"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-[#0f5e7f]"
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
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2">
            <label className="sr-only" htmlFor="home-newsletter-email">
              Endereço de email para a newsletter
            </label>
            <Input
              autoComplete="email"
              className="h-11 min-h-11 min-w-0 flex-1 rounded-md border-white/30 bg-white text-foreground placeholder:text-muted-foreground md:text-sm"
              id="home-newsletter-email"
              name="email"
              placeholder="Insira o seu endereço de email"
              type="email"
            />
            <Button
              className="h-11 shrink-0 rounded-md border-0 bg-white px-6 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-white/90 sm:w-auto sm:text-base"
              type="submit"
            >
              Subscrever
            </Button>
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
