import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/shared/auth-button";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/locale";
import Link from "next/link";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { SidebarProvider } from "@/ui/sidebar";
import DashboardSidebar from "./components/dashboard-sidebar/dashboard-sidebar";

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  // <ThemeSwitcher dict={dictionary.components.themeSwitcher} />

  return (
    <SidebarProvider defaultOpen={false}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {/* {children} */}
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
      </main>
    </SidebarProvider>
    // <main className="min-h-screen flex flex-col items-center">
    //   <div className="flex-1 w-full flex flex-col gap-20 items-center">
    //     <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //       <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
    //         <div className="flex gap-5 items-center font-semibold">
    //           <Link href={"/"}>Next.js Supabase Starter</Link>
    //           <div className="flex items-center gap-2">
    //             <DeployButton />
    //           </div>
    //         </div>
    //         {!hasEnvVars ? (
    //           <EnvVarWarning />
    //         ) : (
    //           <Suspense>
    //             <AuthButton
    //               lang={lang as Locale}
    //               dict={dictionary.components.authButton}
    //             />
    //           </Suspense>
    //         )}
    //       </div>
    //     </nav>
    //     <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
    //       {children}
    //     </div>
    //   </div>
    // </main>
  );
}
