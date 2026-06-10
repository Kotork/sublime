import type { Locale } from "@/lib/i18n/locale";
import { getDictionary } from "../../dictionaries";
import { ContactsTable } from "./contacts-table";

export default async function DashboardContactsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        {dict.navigation.contacts}
      </h1>
      <ContactsTable />
    </div>
  );
}
