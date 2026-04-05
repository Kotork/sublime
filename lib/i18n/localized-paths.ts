import type { Locale } from "./locale";

/** Folder names under `app/[lang]/dashboard/`. */
export const DASHBOARD_CANONICAL_SEGMENTS = [
  "users",
  "website",
  "contacts",
  "form-submissions",
] as const;

export type DashboardCanonicalSegment =
  (typeof DASHBOARD_CANONICAL_SEGMENTS)[number];

export function isDashboardCanonicalSegment(
  s: string
): s is DashboardCanonicalSegment {
  return (DASHBOARD_CANONICAL_SEGMENTS as readonly string[]).includes(s);
}

/**
 * Maps URL segments (per locale) to canonical folder names used by the App Router.
 */
const LOCALIZED_TO_CANONICAL: Record<
  Locale,
  Record<string, DashboardCanonicalSegment>
> = {
  en: {
    users: "users",
    /** Portuguese slug under `/en/...` redirects to `users`. */
    utilizadores: "users",
    website: "website",
    contacts: "contacts",
    "form-submissions": "form-submissions",
  },
  pt: {
    utilizadores: "users",
    users: "users",
    website: "website",
    contacts: "contacts",
    "form-submissions": "form-submissions",
  },
};

/**
 * Canonical segment → URL segment for `href` generation.
 */
const CANONICAL_TO_LOCALIZED: Record<
  Locale,
  Record<DashboardCanonicalSegment, string>
> = {
  en: {
    users: "users",
    website: "website",
    contacts: "contacts",
    "form-submissions": "form-submissions",
  },
  pt: {
    users: "utilizadores",
    website: "website",
    contacts: "contacts",
    "form-submissions": "form-submissions",
  },
};

export function dashboardSegmentToCanonical(
  locale: Locale,
  segment: string
): DashboardCanonicalSegment | null {
  const mapped = LOCALIZED_TO_CANONICAL[locale][segment];
  return mapped ?? null;
}

export function canonicalDashboardSegmentToLocalized(
  locale: Locale,
  segment: DashboardCanonicalSegment
): string {
  return CANONICAL_TO_LOCALIZED[locale][segment];
}
