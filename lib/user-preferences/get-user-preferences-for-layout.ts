import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Locale } from "@/lib/i18n/locale";

export type LayoutUserPreferences =
  | {
      userId: string;
      savedLocale: Locale | null;
      theme: "light" | "dark" | "system" | null;
    }
  | {
      userId: null;
      savedLocale: null;
      theme: null;
    };

export async function getUserPreferencesForLayout(
  supabase: SupabaseClient,
): Promise<LayoutUserPreferences> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { userId: null, savedLocale: null, theme: null };
  }

  const { data } = await supabase
    .from("user_preferences")
    .select("locale, theme")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    return { userId: user.id, savedLocale: null, theme: null };
  }

  return {
    userId: user.id,
    savedLocale: data.locale as Locale,
    theme: data.theme as "light" | "dark" | "system",
  };
}
