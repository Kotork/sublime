"use client";

import { WEBSITE_SOCIAL_LINKS } from "@/lib/social-links";
import { cn } from "@/lib/utils";
import { getLocaleFromPathname } from "@/lib/utils/pathname";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const MOBILE_MAX = 767;
const SCROLL_DELTA = 6;

const NAV_LINKS = [
  { href: "", label: "Início" },
  { href: "/sobre-nos", label: "Sobre nós" },
  { href: "/construcao-lsf", label: "Construção LSF" },
  { href: "/construcao-icf", label: "Construção ICF" },
  {
    href: "/construcao-tradicional-sustentavel",
    label: "Construção Tradicional",
  },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/noticias", label: "Notícias" },
  { href: "/recrutamento", label: "Recrutamento" },
  { href: "/contactos", label: "Contactos" },
] as const;

export function WebsiteNavbar() {
  const pathname = usePathname();
  const lang = getLocaleFromPathname(pathname);
  const base = `/${lang}`;

  const [menuOpen, setMenuOpen] = useState(false);
  const [barHidden, setBarHidden] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const sync = () => {
      setIsMobileViewport(mq.matches);
      if (!mq.matches) {
        setBarHidden(false);
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobileViewport) {
      return;
    }

    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (Math.abs(delta) < SCROLL_DELTA) {
        return;
      }

      if (delta > 0 && y > 48) {
        setBarHidden(true);
        setMenuOpen(false);
      } else if (delta < 0) {
        setBarHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileViewport]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onPointerDown = (e: PointerEvent) => {
      const el = shellRef.current;
      if (!el || el.contains(e.target as Node)) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen, closeMenu]);

  const pathWithoutLocale = pathname.replace(/^\/[^/]+/, "") || "/";

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-transform duration-300 ease-out md:w-auto md:max-w-none",
        isMobileViewport && barHidden && "-translate-y-full md:translate-y-0"
      )}
    >
      <div
        className="bg-white shadow-md md:inline-block md:min-w-0"
        ref={shellRef}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 md:justify-start md:gap-4 md:px-5 md:py-4">
          <div className="order-1 flex min-w-0 flex-1 items-center gap-2 md:order-2 md:flex-initial md:gap-3">
            <Link
              aria-label="Sublime — Início"
              className="flex min-w-0 items-center no-underline hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href={base}
              onClick={closeMenu}
            >
              <Image
                alt=""
                className="h-7 w-auto shrink-0 md:h-8"
                height={56}
                priority
                src="/logo.png"
                // unoptimized
                width={188}
              />
            </Link>

            <span
              aria-hidden
              className="hidden h-10 w-px shrink-0 bg-neutral-300 md:block"
            />

            <p className="hidden max-w-36 text-[10px] font-medium leading-tight text-neutral-800 md:block md:text-[11px]">
              Construção sustentável
            </p>
          </div>

          <button
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="cursor-pointer order-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-transparent text-primary hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:order-1 md:h-10 md:w-10"
            onClick={() => setMenuOpen((o) => !o)}
            type="button"
          >
            {menuOpen ? (
              <X aria-hidden className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu aria-hidden className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t border-neutral-200 transition-[max-height] duration-300 ease-out md:min-w-[280px]",
            menuOpen ? "max-h-[min(70vh,560px)]" : "max-h-0 border-t-0"
          )}
          id={menuId}
        >
          <ul className="list-none space-y-0 px-4 py-3 pb-0 md:px-5">
            {NAV_LINKS.map((item) => {
              const href = item.href ? `${base}${item.href}` : base;
              const itemPath = item.href === "" ? "/" : item.href;
              const isCurrent = pathWithoutLocale === itemPath;

              return (
                <li key={item.label}>
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    className="uppercase block py-1.5 text-sm font-bold text-neutral-900 no-underline hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    href={href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-4 pb-5 pt-12 md:px-5">
            <hr className="mb-6 border-0 border-t border-neutral-200" />
            <section aria-labelledby="navbar-follow-heading">
              <h2
                className="mb-3 text-sm font-bold uppercase italic tracking-wide text-neutral-900"
                id="navbar-follow-heading"
              >
                Siga-nos
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {WEBSITE_SOCIAL_LINKS.map((item) => (
                  <a
                    aria-label={item.ariaLabel}
                    className="py-2 text-xs font-bold uppercase italic tracking-wide text-neutral-900 no-underline hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    href={item.href}
                    key={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </nav>
  );
}
