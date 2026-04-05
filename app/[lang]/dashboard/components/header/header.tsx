"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "./components/user-profile";
import UserBreadcrumbs from "./components/user-breadcrumbs/user-breadcrumbs";
import { getPathnameWithoutLocale } from '@/lib/utils/pathname';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';

function getHomePath(pathSegments: string[]) {
  const targetSegment = "dashboard";
  const baseIndex = pathSegments.findIndex(
    (segment) => segment === "dashboard" || segment === "admin"
  );

  const prefixSegments =
    baseIndex === -1
      ? pathSegments.slice(0, 1)
      : pathSegments.slice(0, baseIndex);
  const prefix = prefixSegments.length ? `/${prefixSegments.join("/")}` : "";

  return `${prefix}/${targetSegment}`;
}

export function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const homePath = getHomePath(pathSegments);
  const isDashboardRoute = getPathnameWithoutLocale(pathname).startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/80 px-4 transition-[width,height] ease-linear backdrop-blur supports-backdrop-filter:bg-background/60 group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) lg:px-6">
      <div className="flex w-full items-center gap-3">
        <Link href={homePath} aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Buzzapy Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </Link>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-5"
        />

        {isDashboardRoute && <UserBreadcrumbs />}

        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
