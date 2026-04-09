/** Normalizes user input to a URL-safe tag slug (must match server syncTags). */
export function normalizeTagSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
