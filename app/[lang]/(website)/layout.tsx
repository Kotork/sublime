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
    <div className="flex min-h-screen min-w-0 flex-col items-center overflow-x-clip">
      <WebsiteNavbar />
      <div className="flex min-w-0 w-full flex-1 flex-col items-center overflow-x-clip">
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
