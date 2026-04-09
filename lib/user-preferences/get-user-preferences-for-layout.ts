import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Locale } from "@/lib/i18n/locale";

import type { SidebarBehavior } from "@/lib/user-preferences/sidebar-behavior";

export type LayoutUserPreferences =
  | {
      userId: string;
      savedLocale: Locale | null;
      theme: "light" | "dark" | "system" | null;
      sidebarBehavior: SidebarBehavior | null;
    }
  | {
      userId: null;
      savedLocale: null;
      theme: null;
      sidebarBehavior: null;
    };

export async function getUserPreferencesForLayout(
  supabase: SupabaseClient,
): Promise<LayoutUserPreferences> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { userId: null, savedLocale: null, theme: null, sidebarBehavior: null };
  }

  const { data } = await supabase
    .from("user_preferences")
    .select("locale, theme, sidebar_behavior")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    return { userId: user.id, savedLocale: null, theme: null, sidebarBehavior: null };
  }

  return {
    userId: user.id,
    savedLocale: data.locale as Locale,
    theme: data.theme as "light" | "dark" | "system",
    sidebarBehavior: data.sidebar_behavior as SidebarBehavior,
  };
}
