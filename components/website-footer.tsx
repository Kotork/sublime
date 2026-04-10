import type { Locale } from "@/lib/i18n/locale";
import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    href: "https://example.com/facebook",
    label: "FACEBOOK",
    ariaLabel: "Facebook (ligação de exemplo)",
  },
  {
    href: "https://example.com/instagram",
    label: "INSTAGRAM",
    ariaLabel: "Instagram (ligação de exemplo)",
  },
  {
    href: "https://example.com/linkedin",
    label: "LINKEDIN",
    ariaLabel: "LinkedIn (ligação de exemplo)",
  },
] as const;

const linkClass =
  "text-[10px] font-medium uppercase tracking-wide text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-xs";

export function WebsiteFooter({ lang }: { lang: Locale }) {
  const base = `/${lang}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-primary text-white">
      <div className={"mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:px-8"}>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:items-center md:gap-6">
          <nav
            aria-label="Informações legais"
            className="order-1 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6 md:order-2 md:flex-row md:justify-center md:gap-6"
          >
            <Link
              className={linkClass}
              href={`${base}/politica-de-privacidade`}
            >
              Política de privacidade
            </Link>
            <a
              className={linkClass}
              href="https://www.livroreclamacoes.pt/INICIO/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Livro de reclamações
            </a>
          </nav>

          <nav
            aria-label="Redes sociais"
            className="order-2 flex flex-wrap justify-center gap-4 md:order-3 md:flex-col md:items-end md:justify-start md:gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-6"
          >
            {SOCIAL_LINKS.map(({ href, label, ariaLabel }) => (
              <a
                key={href}
                aria-label={ariaLabel}
                className={linkClass}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="order-3 shrink-0 justify-self-center md:order-1 md:justify-self-start">
            <Link
              aria-label="Sublime — Início"
              className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={base}
            >
              <Image
                alt=""
                className="h-8 w-auto md:h-9"
                height={56}
                src="/logo-alt.png"
                width={188}
              />
            </Link>
          </div>
        </div>

        <hr className="my-8 border-t border-white/60" />

        <div className="grid grid-cols-1 gap-4 text-center text-[10px] font-medium tracking-wide sm:text-xs md:grid-cols-3 md:items-center md:gap-6">
          <p className="max-w-prose text-balance md:justify-self-start md:text-left">
            ©{currentYear} Sublime. Todos os direitos reservados.
          </p>
          <Link
            className="justify-self-center text-[10px] font-medium tracking-wide text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-xs"
            href={`${base}/auth/login`}
          >
            Area reservada
          </Link>
          <p className="md:justify-self-end md:text-right">
            Desenvolvido por{" "}
            <a
              className="justify-self-center text-[10px] font-medium tracking-wide text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-xs"
              href="https://buzzapy.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Buzzapy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
