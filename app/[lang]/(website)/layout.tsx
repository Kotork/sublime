import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { WebsiteNavbar } from "@/components/website-navbar";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import { cn } from "@/lib/utils";

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  await params;

  return (
    <div className="min-h-screen flex flex-col items-center">
      <WebsiteNavbar />
      <div className="flex-1 w-full flex flex-col items-center">
        <div className={cn("flex-1", WEBSITE_CONTENT_COLUMN_CLASS)}>
          {children}
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </div>
  );
}
