import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/shared/auth-button";
import { hasEnvVars } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/locale";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import DashboardSidebar from "./components/dashboard-sidebar/dashboard-sidebar";
import { Header } from "./components/header/header";

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
    <SidebarProvider defaultOpen={false}>
      <DashboardSidebar dict={dictionary} />
      <SidebarInset className="min-h-svh">
        {/* <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger className="-ml-1" />
        </header> */}
        <Header />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="container mx-auto flex flex-1 flex-col gap-6 p-4 md:p-6">
            {children}
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton
                  lang={lang as Locale}
                  dict={dictionary.components.authButton}
                />
              </Suspense>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
