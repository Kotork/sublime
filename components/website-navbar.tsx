"use client";

import { cn } from "@/lib/utils";
import { getLocaleFromPathname } from "@/lib/utils/pathname";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const MOBILE_MAX = 767;
const SCROLL_DELTA = 6;

const NAV_LINKS = [
  { href: "", label: "Início" },
  { href: "#projects", label: "Projetos" },
  { href: "#timelapse", label: "Timelapse" },
  { href: "#purpose", label: "O nosso propósito" },
  { href: "#next-gen", label: "Nova geração de edifícios" },
  { href: "#partnership", label: "Parceria" },
  { href: "#contact", label: "Contactos" },
] as const;

function SublimeLogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("shrink-0 text-[#003366]", className)}
      height={28}
      viewBox="0 0 40 28"
      width={40}
    >
      <path fill="currentColor" d="M2 4l12 10L2 24V4z" />
      <path fill="currentColor" d="M16 4l12 10-12 10V4z" />
    </svg>
  );
}

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
  const isHome = pathWithoutLocale === "/";

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-transform duration-300 ease-out md:w-auto md:max-w-none",
        isMobileViewport && barHidden && "-translate-y-full md:translate-y-0",
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
              className="flex min-w-0 items-center gap-2 no-underline hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003366]"
              href={base}
              onClick={closeMenu}
            >
              <SublimeLogoMark className="h-7 w-10" />
              <span className="text-lg font-bold tracking-tight text-[#003366]">
                SUBLIME
              </span>
            </Link>

            <span
              aria-hidden
              className="hidden h-10 w-px shrink-0 bg-neutral-300 md:block"
            />

            <p className="max-w-36 text-[10px] font-medium leading-tight text-neutral-800 md:text-[11px]">
              Construção sustentável
            </p>
          </div>

          <button
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="cursor-pointer order-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-transparent text-[#003366] hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003366] md:order-1 md:h-10 md:w-10"
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
            menuOpen ? "max-h-[min(70vh,520px)]" : "max-h-0 border-t-0",
          )}
          id={menuId}
        >
          <ul className="list-none space-y-0 px-4 py-3 pb-5 md:px-5">
            {NAV_LINKS.map((item) => {
              const href = item.href ? `${base}${item.href}` : base;
              const isCurrent = item.href === "" && isHome;

              return (
                <li key={item.label}>
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    className="block py-2.5 text-sm font-bold text-neutral-900 no-underline hover:text-[#003366] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003366]"
                    href={href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
