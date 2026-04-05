import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/client/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/client";
import { redirect } from "next/navigation";
import { defaultLocale, type Locale } from "@/lib/i18n/locale";
import { getDictionary, hasLocale } from "./dictionaries";
import { DictionaryProvider } from '@/lib/client/providers/dictionary-provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <DictionaryProvider dictionary={dictionary}>
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
