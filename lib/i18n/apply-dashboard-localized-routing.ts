import { NextResponse, type NextRequest } from "next/server";
import { isValidLocale } from "@/lib/i18n/locale";
import {
  canonicalDashboardSegmentToLocalized,
  dashboardSegmentToCanonical,
} from "@/lib/i18n/localized-paths";

const nextLocaleCookie = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

function mergeCookiesFrom(source: NextResponse, target: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie.name, cookie.value, cookie);
  });
}

/**
 * After auth: align the URL with each locale’s public slug, then rewrite to the
 * internal App Router path when the folder name differs (e.g. PT `utilizadores` → `users`).
 *
 * - Segment ≠ preferred slug for locale → **redirect** (e.g. `/en/.../utilizadores` → `/en/.../users`,
 *   `/pt/.../users` → `/pt/.../utilizadores`).
 * - Segment is preferred but ≠ canonical folder → **rewrite** (e.g. `/pt/.../utilizadores` → internal `users`).
 */
export function applyDashboardLocalizedRouting(
  request: NextRequest,
  sessionResponse: NextResponse,
  pathname: string,
  pathnameHasLocale: boolean
): NextResponse | null {
  if (!pathnameHasLocale) return null;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 3) return null;

  const locale = segments[0];
  if (!isValidLocale(locale)) return null;
  if (segments[1] !== "dashboard") return null;

  const segment = segments[2];
  const rest = segments.slice(3);

  const canonical = dashboardSegmentToCanonical(locale, segment);
  if (canonical === null) return null;

  const preferred = canonicalDashboardSegmentToLocalized(locale, canonical);

  if (segment !== preferred) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/dashboard/${preferred}${rest.length ? `/${rest.join("/")}` : ""}`;
    const redirectResponse = NextResponse.redirect(url);
    mergeCookiesFrom(sessionResponse, redirectResponse);
    redirectResponse.cookies.set("NEXT_LOCALE", locale, nextLocaleCookie);
    return redirectResponse;
  }

  if (segment !== canonical) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/dashboard/${canonical}${rest.length ? `/${rest.join("/")}` : ""}`;
    const rewriteResponse = NextResponse.rewrite(url);
    mergeCookiesFrom(sessionResponse, rewriteResponse);
    rewriteResponse.cookies.set("NEXT_LOCALE", locale, nextLocaleCookie);
    return rewriteResponse;
  }

  return null;
}
