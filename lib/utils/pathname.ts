import { locales, isValidLocale } from "@/lib/i18n/locale";

/**
 * Extracts the locale from a pathname if it exists.
 * @param pathname - The pathname to check (e.g., "/en/admin" or "/pt/dashboard")
 * @returns The locale string if found, null otherwise
 */
export function getLocaleFromPathname(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return null;
  }

  const firstSegment = segments[0];
  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return null;
}

/**
 * Removes the locale prefix from a pathname.
 * @param pathname - The pathname to process (e.g., "/en/admin" or "/pt/dashboard")
 * @returns The pathname without the locale prefix (e.g., "/admin" or "/dashboard")
 */
export function getPathnameWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) {
    return pathname;
  }

  // Remove the locale prefix: /{locale}/... becomes /...
  const pathnameWithoutLocale = pathname.replace(/^\/[^/]+/, "") || "/";
  return pathnameWithoutLocale;
}
