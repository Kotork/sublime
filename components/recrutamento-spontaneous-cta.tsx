import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

const HEADING_ID = "recrutamento-spontaneous-cta-heading";

const CONTACT_EMAIL = "info@sublime-pt.com";

const MAIL_SUBJECT = "Candidatura espontânea";

const MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;

const CTA_LINK_CLASS =
  "inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-[#165A72] px-8 text-sm font-bold text-white transition-colors hover:bg-[#124a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-12 sm:px-10 sm:text-base";

const EMAIL_LINK_CLASS =
  "font-bold text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function RecrutamentoSpontaneousCta() {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="w-full bg-background py-16 md:py-20 lg:py-24"
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-col items-center px-4 sm:px-5",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2 className="sr-only" id={HEADING_ID}>
          {MAIL_SUBJECT}
        </h2>
        <p className="mx-auto text-pretty text-base leading-relaxed text-foreground md:text-lg">
          Mesmo que não exista uma vaga que corresponda ao seu perfil, envie-nos
          a sua candidatura espontânea para:{" "}
          <a className={EMAIL_LINK_CLASS} href={MAILTO_HREF}>
            {CONTACT_EMAIL}
          </a>
          . Guardamos todos os currículos e contactamos quando surgir uma
          oportunidade adequada.
        </p>
        <div className="mt-10 md:mt-12">
          <a className={CTA_LINK_CLASS} href={MAILTO_HREF}>
            {MAIL_SUBJECT}
          </a>
        </div>
      </div>
    </section>
  );
}
