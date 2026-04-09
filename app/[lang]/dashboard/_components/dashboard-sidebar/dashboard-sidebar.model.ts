import {
  ContactRound,
  FileText,
  Home,
  Inbox,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { canonicalDashboardSegmentToLocalized } from "@/lib/i18n/localized-paths";
import { getLocaleFromPathname } from "@/lib/utils/pathname";

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

/** Labels for the fixed dashboard sidebar (en/pt via `getDictionary`). */
export type NavigationDictionary = {
  navigation: {
    sections: {
      dashboard: string;
      website: string;
      crm: string;
    };
    home: string;
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
): NavGroup[] {
  const base = buildDashboardBase(pathname);
  const locale = getLocaleFromPathname(pathname);
  const usersPath = `${base}/${canonicalDashboardSegmentToLocalized(locale, "users")}`;
  const contactsPath = `${base}/${canonicalDashboardSegmentToLocalized(locale, "contacts")}`;
  const formSubmissionsPath = `${base}/${canonicalDashboardSegmentToLocalized(locale, "form-submissions")}`;

  return [
    {
      title: dict.navigation.sections.dashboard,
      items: [
        {
          name: dict.navigation.home,
          href: base,
          icon: Home,
        },
        {
          name: dict.navigation.users,
          href: usersPath,
          icon: Users,
        },
      ],
    },
    {
      title: dict.navigation.sections.website,
      items: [
        {
          name: dict.navigation.blog,
          href: `${base}/blog`,
          icon: FileText,
        },
      ],
    },
    {
      title: dict.navigation.sections.crm,
      items: [
        {
          name: dict.navigation.contacts,
          href: contactsPath,
          icon: ContactRound,
        },
        {
          name: dict.navigation.formSubmissions,
          href: formSubmissionsPath,
          icon: Inbox,
        },
      ],
    },
  ];
}

function flattenItems(groups: NavGroup[]): NavItem[] {
  return groups.flatMap((g) => g.items);
}

export function createIsActive(pathname: string, groups: NavGroup[]) {
  const navigation = flattenItems(groups);
  return (href: string) => {
    if (pathname === href) {
      return true;
    }

    if (pathname.startsWith(`${href}/`)) {
      const moreSpecificMatch = navigation.find(
        (item) =>
          ((item.href !== href &&
            item.href.startsWith(`${href}/`) &&
            pathname.startsWith(`${item.href}/`)) ||
            pathname === item.href)
      );

      return !moreSpecificMatch;
    }

    return false;
  };
}
