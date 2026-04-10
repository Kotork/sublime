import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { WebsiteFooter } from "@/components/website-footer";
import { WebsiteNavbar } from "@/components/website-navbar";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { defaultLocale, isValidLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isValidLocale(langParam) ? langParam : defaultLocale;

  return (
    <div className="min-h-screen flex flex-col items-center">
      <WebsiteNavbar />
      <div className="flex-1 w-full flex flex-col items-center">
        <div className={cn("flex-1", WEBSITE_CONTENT_COLUMN_CLASS)}>
          {children}
        </div>

        <WebsiteFooter lang={lang} />
        {/* <div className="flex w-full justify-center py-4">
          <ThemeSwitcher />
        </div> */}
      </div>
    </div>
  );
}
