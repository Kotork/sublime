import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n/locale";
import { applyDashboardLocalizedRouting } from "@/lib/i18n/apply-dashboard-localized-routing";
import { updateSession } from "./lib/supabase/middleware";

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname;

  // Check if locale is in pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = pathname.split("/")[1];
    if (isValidLocale(locale)) {
      return locale;
    }
  }

  // Check cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? undefined;
  if (acceptLanguage) {
    const negotiator = new Negotiator({
      headers: { "accept-language": acceptLanguage },
    });
    const languages = negotiator.languages();
    const matchedLocale = match(languages, locales, defaultLocale);
    if (isValidLocale(matchedLocale)) {
      return matchedLocale;
    }
  }

  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  // Skip locale handling for API routes and static files
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return response;
  }

  const locale = getLocale(request);
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Set locale cookie
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  const redirectWithSupabaseCookies = (destination: string) => {
    const url = request.nextUrl.clone();
    // Ensure destination includes locale prefix
    const destHasLocale = locales.some(
      (loc) => destination.startsWith(`/${loc}/`) || destination === `/${loc}`
    );
    const finalDestination = destHasLocale
      ? destination
      : `/${locale}${destination}`;
    url.pathname = finalDestination;

    const redirectResponse = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    redirectResponse.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return redirectResponse;
  };

  // Redirect if pathname doesn't have locale (except root)
  if (!pathnameHasLocale && pathname !== "/") {
    return redirectWithSupabaseCookies(pathname);
  }

  // Get user role if authenticated
  let userRole: string | null = null;
  if (user) {
    let roleResponse = response;
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value);
            });
            roleResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => {
              roleResponse.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    userRole = userData?.role || null;

    // Merge any cookies set during the query
    roleResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, cookie);
    });
  }

  // Extract locale from pathname for route checks
  const pathnameWithoutLocale = pathnameHasLocale
    ? pathname.replace(/^\/[^/]+/, "") || "/"
    : pathname;

  // Root path redirect
  // `/{locale}` strips to `/` — only treat bare `/` and localized home differently:
  // guests should see `app/[lang]/page.tsx` at `/en`, `/pt`, etc.; `/` still gets a locale prefix.
  if (pathname === "/" || pathnameWithoutLocale === "/") {
    if (pathnameHasLocale && pathnameWithoutLocale === "/") {
      if (user) {
        return redirectWithSupabaseCookies(
          userRole === "staff" ? "/admin" : "/dashboard"
        );
      }
      return response;
    }

    if (pathname === "/") {
      if (!user) {
        return redirectWithSupabaseCookies("/");
      }
      return redirectWithSupabaseCookies(
        userRole === "staff" ? "/admin" : "/dashboard"
      );
    }
  }

  // Admin routes - require staff role
  if (
    pathnameWithoutLocale.startsWith("/admin") ||
    pathname.startsWith(`/${locale}/admin`)
  ) {
    if (!user) {
      return redirectWithSupabaseCookies("/");
    }
    if (userRole !== "staff") {
      return redirectWithSupabaseCookies("/forbidden");
    }
  }

  // Dashboard routes - require authentication (any authenticated user)
  if (
    pathnameWithoutLocale.startsWith("/dashboard") ||
    pathname.startsWith(`/${locale}/dashboard`)
  ) {
    if (!user) {
      return redirectWithSupabaseCookies("/");
    }
  }

  const dashboardLocalized = applyDashboardLocalizedRouting(
    request,
    response,
    pathname,
    pathnameHasLocale
  );
  if (dashboardLocalized) {
    return dashboardLocalized;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
