import { ContactRound, FileText, Globe, Inbox, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { canonicalDashboardSegmentToLocalized } from "@/lib/i18n/localized-paths";
import { getLocaleFromPathname } from "@/lib/utils/pathname";

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

/** Labels for the fixed dashboard sidebar (en/pt via `getDictionary`). */
export type NavigationDictionary = {
  navigation: {
    users: string;
    website: string;
    contacts: string;
    formSubmissions: string;
    blog: string;
  };
};

function buildDashboardBase(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const i = parts.indexOf("dashboard");
  if (i >= 0) {
    return `/${parts.slice(0, i + 1).join("/")}`;
  }
  if (parts.length >= 1) {
    return `/${parts[0]}/dashboard`;
  }
  return "/dashboard";
}

export function buildNavigation(
  pathname: string,
  dict: NavigationDictionary
): NavItem[] {
  const base = buildDashboardBase(pathname);
  const locale = getLocaleFromPathname(pathname);
  return [
    {
      name: dict.navigation.users,
      href: `${base}/${canonicalDashboardSegmentToLocalized(locale, "users")}`,
      icon: Users,
    },
    {
      name: dict.navigation.website,
      href: `${base}/${canonicalDashboardSegmentToLocalized(locale, "website")}`,
      icon: Globe,
    },
    {
      name: dict.navigation.contacts,
      href: `${base}/${canonicalDashboardSegmentToLocalized(locale, "contacts")}`,
      icon: ContactRound,
    },
    {
      name: dict.navigation.formSubmissions,
      href: `${base}/${canonicalDashboardSegmentToLocalized(locale, "form-submissions")}`,
      icon: Inbox,
    },
    {
      name: dict.navigation.blog,
      href: `${base}/blog`,
      icon: FileText,
    },
  ];
}

export function createIsActive(pathname: string, navigation: NavItem[]) {
  return (href: string) => {
    if (pathname === href) {
      return true;
    }

    if (pathname.startsWith(`${href}/`)) {
      const moreSpecificMatch = navigation.find(
        (item) =>
          (item.href !== href &&
            item.href.startsWith(`${href}/`) &&
            pathname.startsWith(`${item.href}/`)) ||
          pathname === item.href
      );

      return !moreSpecificMatch;
    }

    return false;
  };
}
