import { isValidLocale, type Locale } from "@/lib/i18n/locale";
import {
  canonicalDashboardSegmentToLocalized,
  dashboardSegmentToCanonical,
} from "@/lib/i18n/localized-paths";
import { getLocaleFromPathname } from "@/lib/utils/pathname";

/**
 * Builds the pathname for the same logical page under `targetLocale`, including
 * dashboard segment localization (e.g. `users` ↔ `utilizadores`).
 */
export function getPathForLocale(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  const currentLocale = getLocaleFromPathname(pathname);
  const rest = isValidLocale(segments[0]!)
    ? segments.slice(1)
    : segments;

  if (rest.length === 0) {
    return `/${targetLocale}`;
  }

  if (rest[0] === "dashboard" && rest.length >= 2) {
    const dashSegment = rest[1]!;
    const canonical = dashboardSegmentToCanonical(currentLocale, dashSegment);
    if (canonical !== null) {
      const localized = canonicalDashboardSegmentToLocalized(
        targetLocale,
        canonical
      );
      const newRest = ["dashboard", localized, ...rest.slice(2)];
      return `/${targetLocale}/${newRest.join("/")}`;
    }
  }

  return `/${targetLocale}/${rest.join("/")}`;
}
