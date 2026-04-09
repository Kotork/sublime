import type { Locale } from "@/lib/i18n/locale";
import { getUserPreferencesForLayout } from "@/lib/user-preferences/get-user-preferences-for-layout";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "../../dictionaries";
import { AccountSettingsForm } from "./account-settings-form";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const supabase = await createClient();
  const prefs = await getUserPreferencesForLayout(supabase);

  return (
    <AccountSettingsForm
      dict={dictionary.pages.dashboard.settings}
      initialSidebarBehavior={
        prefs.userId ? prefs.sidebarBehavior : null
      }
      canPersistSidebar={prefs.userId !== null}
    />
  );
}
