import { ContactosContactForm } from "@/components/contactos-contact-form";
import { Badge } from "@/components/ui/badge";
import { WebsiteSocialLinks } from "@/components/website-social-links";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";

const CONTACT_EMAIL = "info@sublimept.pt";
const CONTACT_PHONE_DISPLAY = "+351 963 412 090";

const SECTION_HEADING_ID = "contactos-info-heading";

const CONTACT_LINK_CLASS =
  "underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

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
        <div className="overflow-hidden rounded-xl border border-border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <aside className="bg-primary p-6 text-primary-foreground md:p-8">
              <Badge
                className="mb-5 rounded-full border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-foreground"
                variant="outline"
              >
                Contactos
              </Badge>
              <h2
                className="text-pretty text-2xl font-bold leading-tight tracking-tight md:text-3xl"
                id={SECTION_HEADING_ID}
              >
                Sublime Positivity - Unipessoal Lda
              </h2>
              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                    <MapPin
                      aria-hidden
                      className="size-5 text-white"
                      strokeWidth={1.75}
                    />
                  </span>
                  <address className="text-sm not-italic leading-relaxed text-primary-foreground md:text-base">
                    <p className="text-pretty">Rua da Beira, 977</p>
                    <p className="text-pretty">
                      3030-884, São Frutuoso, Coimbra
                    </p>
                  </address>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                    <Mail
                      aria-hidden
                      className="size-5 text-white"
                      strokeWidth={1.75}
                    />
                  </span>
                  <a
                    className={cn(
                      "text-sm leading-relaxed text-primary-foreground md:text-base",
                      CONTACT_LINK_CLASS
                    )}
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-primary">
                    <Phone
                      aria-hidden
                      className="size-5 text-white"
                      strokeWidth={1.75}
                    />
                  </span>
                  <div className="text-sm leading-relaxed text-primary-foreground md:text-base">
                    <a className={CONTACT_LINK_CLASS} href="tel:+351963412090">
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                    <span className="mt-1 block text-xs text-primary-foreground/70">
                      (Chamada para rede móvel nacional)
                    </span>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                  Redes sociais
                </p>
                <WebsiteSocialLinks variant="dark" />
              </div>
            </aside>

            <div className="bg-background p-6 md:p-8 md:pr-10">
              <ContactosContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
