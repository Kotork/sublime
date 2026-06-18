import type { Locale } from "@/lib/i18n/locale";
import { WebsiteSocialLinks } from "@/components/website-social-links";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    // { href: `${base}/noticias`, label: "Notícias" }, // v1: not launching yet
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
                className="h-16 xl:h-20 w-auto"
                height={300}
                src="/logo-alt.png"
                width={1185}
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Construímos hoje as casas responsáveis de amanhã.
              <br />
              Tradição, inovação e pessoas — no Distrito de Coimbra desde 2021.
            </p>
            <p className="text-sm text-white/70">Alvará 112885 - PAR</p>
            <WebsiteSocialLinks variant="dark" />
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
                <div className="flex flex-col gap-0.5">
                  <a
                    className="underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    href="tel:+351963412090"
                  >
                    +351 963 412 090
                  </a>
                  <span className="text-[10px] leading-tight text-white/50">
                    (Chamada para rede móvel nacional)
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                <a
                  className="underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href="mailto:info@sublimept.pt"
                >
                  info@sublimept.pt
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
