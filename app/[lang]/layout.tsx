import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/client/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/client";
import { redirect } from "next/navigation";
import { defaultLocale, type Locale } from "@/lib/i18n/locale";
import { getDictionary, hasLocale } from "./dictionaries";
import { DictionaryProvider } from "@/lib/client/providers/dictionary-provider";
import { createClient } from "@/lib/supabase/server";
import { LocalePreferenceBanner } from "@/components/shared/locale-preference-banner";
import { LocalePreferenceSync } from "@/components/shared/locale-preference-sync";
import { getUserPreferencesForLayout } from "@/lib/user-preferences/get-user-preferences-for-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Landing Page Generator",
  description: "Create and manage SEO/AEO optimized landing pages",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang as Locale);

  if (!hasLocale(lang)) {
    redirect(`/${defaultLocale}`);
  }

  const supabase = await createClient();
  const prefs = await getUserPreferencesForLayout(supabase);
  const defaultTheme = prefs.theme ?? "light";
  const themeStorageKey = prefs.userId ? `theme-${prefs.userId}` : "theme";

  return (
    <html lang={lang} suppressHydrationWarning>
           <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem
          disableTransitionOnChange
          storageKey={themeStorageKey}
        >
          <DictionaryProvider dictionary={dictionary}>
            <TRPCReactProvider>
              <LocalePreferenceSync />
              <LocalePreferenceBanner
                savedLocale={prefs.userId ? prefs.savedLocale : null}
                currentLocale={lang}
              />
              {children}
            </TRPCReactProvider>
            <Toaster />
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
