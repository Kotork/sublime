import type { Locale } from "@/lib/i18n/locale";
import { getDictionary } from "../../dictionaries";
import { AccountSettingsForm } from "./account-settings-form";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <AccountSettingsForm dict={dictionary.pages.dashboard.settings} />;
}
