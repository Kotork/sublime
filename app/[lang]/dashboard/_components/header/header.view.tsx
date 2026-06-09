import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { Separator } from "@/components/ui/separator";

import UserBreadcrumbs from "./components/user-breadcrumbs";
import UserProfile from "./components/user-profile";

type HeaderViewProps = {
  homePath: string;
  isDashboardRoute: boolean;
};

export function HeaderView({ homePath, isDashboardRoute }: HeaderViewProps) {
  return (
    <header className="sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/80 px-4 transition-[width,height] ease-linear backdrop-blur supports-backdrop-filter:bg-background/60 group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) lg:px-6">
      <div className="flex w-full items-center gap-3">
        <Link href={homePath} aria-label="Home">
          <Image
            src="/logo.png"
            alt="Sublime Logo"
            width={1185}
            height={300}
            className="h-8 w-auto"
          />
        </Link>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-5"
        />

        {isDashboardRoute && <UserBreadcrumbs />}

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
