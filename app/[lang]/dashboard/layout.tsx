import type { Locale } from "@/lib/i18n/locale";
import { getUserPreferencesForLayout } from "@/lib/user-preferences/get-user-preferences-for-layout";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "../dictionaries";
import { DashboardSidebarShell } from "./_components/dashboard-sidebar-shell";
import { Header } from "./_components/header/header";

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const supabase = await createClient();
  const prefs = await getUserPreferencesForLayout(supabase);

  return (
    <div className="flex h-svh max-h-svh flex-col overflow-hidden">
      <Header />
      <DashboardSidebarShell
        dict={dictionary}
        initialSidebarBehavior={prefs.userId ? prefs.sidebarBehavior : null}
        canPersistSidebar={prefs.userId !== null}
      >
        {children}
      </DashboardSidebarShell>
    </div>
  );
}
