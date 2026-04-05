import type { Locale } from "@/lib/i18n/locale";
import { getDictionary } from "../../dictionaries";

export default async function DashboardFormSubmissionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <h1 className="text-2xl font-semibold tracking-tight">
      {dict.navigation.formSubmissions}
    </h1>
  );
}
