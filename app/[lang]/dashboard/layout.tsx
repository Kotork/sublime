import { EnvVarWarning } from "@/components/env-var-warning";
import type { Locale } from "@/lib/i18n/locale";
import { hasEnvVars } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import DashboardSidebar from "./_components/dashboard-sidebar/dashboard-sidebar";
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

  return (
    <div className="flex h-svh max-h-svh flex-col overflow-hidden">
      <Header />
      <SidebarProvider
        defaultOpen={false}
        className="flex min-h-0 flex-1 overflow-hidden"
      >
        <DashboardSidebar dict={dictionary} />
        <SidebarInset className="min-h-0 overflow-hidden">
          {/* <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger className="-ml-1" />
        </header> */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            <div className="container mx-auto flex flex-col gap-6 p-4 md:p-6">
              {!hasEnvVars ? <EnvVarWarning /> : <Suspense>{children}</Suspense>}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
