import type { Locale } from "@/lib/i18n/locale";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.5 9H15.5V6.5H13.5C11.84 6.5 10.5 7.84 10.5 9.5V11H8.5V13.5H10.5V19.5H13V13.5H15L15.5 11H13V9.75C13 9.34 13.22 9 13.5 9Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect height="18" rx="5" ry="5" width="18" x="3" y="3" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const SOCIAL_LINKS: ReadonlyArray<{
  href: string;
  ariaLabel: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  {
    href: "https://www.facebook.com/pt.sublime/",
    ariaLabel: "Facebook Sublime",
    Icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/sublimeportugal/",
    ariaLabel: "Instagram Sublime",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.linkedin.com/in/jose-ferramenta-17979569/",
    ariaLabel: "LinkedIn Sublime",
    Icon: LinkedinIcon,
  },
  {
    href: "https://example.com/whatsapp",
    ariaLabel: "WhatsApp (ligação de exemplo)",
    Icon: MessageCircle,
  },
];

const columnHeadingClass =
  "text-xs font-semibold uppercase tracking-[0.18em] text-white";

const columnLinkClass =
  "text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const bottomLinkClass =
  "text-[10px] font-medium tracking-wide text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-xs";

export function WebsiteFooter({ lang }: { lang: Locale }) {
  const base = `/${lang}`;
  const currentYear = new Date().getFullYear();

  const sistemasLinks = [
    { href: `${base}/construcao-tradicional-sustentavel`, label: "Construção Tradicional" },
    { href: `${base}/construcao-icf`, label: "ICF - Betão Isolado" },
    { href: `${base}/construcao-lsf`, label: "LSF - Estrutura Metálica" },
  ];

  const empresaLinks = [
    { href: `${base}/sobre-nos`, label: "Sobre Nós" },
    { href: `${base}/parceiros`, label: "Parceiros" },
    { href: `${base}/noticias`, label: "Notícias" },
    { href: `${base}/recrutamento`, label: "Recrutamento" },
    { href: `${base}/contactos`, label: "Contactos" },
  ];

  return (
    <footer className="mt-auto w-full bg-[#1a2332] text-white">
      <div className="mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-5">
            <Link
              aria-label="Sublime — Início"
              className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={base}
            >
              <Image
                alt=""
                className="h-9 w-auto"
                height={56}
                src="/logo-alt.png"
                width={188}
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Construímos hoje as casas responsáveis de amanhã.
              <br />
              Tradição, inovação e pessoas — no Distrito de Coimbra desde 2009.
            </p>
            <ul className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ href, ariaLabel, Icon }) => (
                <li key={href}>
                  <a
                    aria-label={ariaLabel}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-sistemas-heading" className="flex flex-col gap-4">
            <h2 className={columnHeadingClass} id="footer-sistemas-heading">
              Sistemas
            </h2>
            <ul className="flex flex-col gap-3">
              {sistemasLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link className={columnLinkClass} href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-empresa-heading" className="flex flex-col gap-4">
            <h2 className={columnHeadingClass} id="footer-empresa-heading">
              Empresa
            </h2>
            <ul className="flex flex-col gap-3">
              {empresaLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link className={columnLinkClass} href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className={columnHeadingClass}>Contacto</h2>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                <a
                  className="underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href="tel:+351000000000"
                >
                  +351 XXX XXX XXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                <a
                  className="underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href="mailto:info@sublime-pt.com"
                >
                  info@sublime-pt.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                <span>Distrito de Coimbra, Portugal</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                <span>
                  Seg–Sex: 9h–18h
                  <br />
                  Emergências: 24h
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-t border-white/15" />

        <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3 md:items-center md:gap-6">
          <p className="text-[10px] font-medium tracking-wide text-white/70 sm:text-xs md:justify-self-start md:text-left">
            ©{currentYear} Sublime. Todos os direitos reservados.
          </p>
          <nav
            aria-label="Informações legais e área reservada"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6"
          >
            <Link className={bottomLinkClass} href={`${base}/politica-de-privacidade`}>
              Política de privacidade
            </Link>
            <a
              className={bottomLinkClass}
              href="https://www.livroreclamacoes.pt/INICIO/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Livro de reclamações
            </a>
            <Link className={bottomLinkClass} href={`${base}/auth/login`}>
              Área reservada
            </Link>
          </nav>
          <p className="text-[10px] font-medium tracking-wide text-white/70 sm:text-xs md:justify-self-end md:text-right">
            Desenvolvido por{" "}
            <a
              className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
