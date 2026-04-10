import { ContactosContactForm } from "@/components/contactos-contact-form";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { WEBSITE_SOCIAL_LINKS } from "@/lib/social-links";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "info@sublime-pt.com";
const CONTACT_PHONE_DISPLAY = "+351 963 412 090";

const SECTION_HEADING_ID = "contactos-info-heading";

export function ContactosContactSection() {
  return (
    <section
      aria-labelledby={SECTION_HEADING_ID}
      className="w-full bg-background"
    >
      <div
        className={cn(
          "mx-auto w-full px-4 py-12 sm:px-5 md:py-16 lg:py-20",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="text-left flex flex-col gap-8">
            <h2
              className="text-pretty text-lg font-bold text-foreground md:text-xl"
              id={SECTION_HEADING_ID}
            >
              Sublime Positivity - Unipessoal Lda
            </h2>
            <address className="text-base not-italic leading-relaxed text-foreground">
              <p className="text-pretty">Rua da Beira, 977</p>
              <p className="text-pretty">3030-884, São Frutuoso, Coimbra</p>
            </address>
            <a
              className="text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            <a
              className="text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href="tel:+351963412090"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
            <nav aria-label="Redes sociais">
              <ul className="flex flex-col">
                {WEBSITE_SOCIAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <a
                      aria-label={item.ariaLabel}
                      className="text-sm font-normal uppercase tracking-wide text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      href={item.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <ContactosContactForm />
        </div>
      </div>
    </section>
  );
}
