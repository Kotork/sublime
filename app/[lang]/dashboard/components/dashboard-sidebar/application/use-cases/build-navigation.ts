import {
  BarChart3,
  FileText,
  Inbox,
  Key,
  LayoutDashboard,
  Mail,
  Users,
} from "lucide-react";

import type { NavItem } from "../models/nav-item";

type Dictionary = {
  navigation: {
    overview: string;
    organizations: string;
    projects: string;
    contacts: string;
    formSubmissions: string;
    users: string;
    analytics: string;
    apiKey: string;
  };
};

function buildBasePath(pathname: string, anchor: string) {
  const segments = pathname.split("/").filter(Boolean);
  const anchorIndex = segments.indexOf(anchor);
  if (anchorIndex === -1) return `/${anchor}`;
  const prefixSegments = anchorIndex > 0 ? segments.slice(0, anchorIndex) : [];
  const prefix = prefixSegments.length ? `/${prefixSegments.join("/")}` : "";
  return `${prefix}/${anchor}`;
}

function buildOrgBasePath(pathname: string, organizationId: string) {
  return `${buildBasePath(pathname, "dashboard")}/${organizationId}`;
}

function buildProjectBasePath(
  pathname: string,
  organizationId: string,
  projectId: string
) {
  return `${buildOrgBasePath(pathname, organizationId)}/proj/${projectId}`;
}

function buildDashboardNavigation(base: string, dict: Dictionary): NavItem[] {
  return [
    {
      name: dict.navigation.organizations,
      href: `${base}`,
      icon: LayoutDashboard,
    },
    // { name: dict.navigation.organizations, href: `${base}/organizations`, icon: FileText },
  ];
}

function buildOrganizationNavigation(
  base: string,
  dict: Dictionary
): NavItem[] {
  return [
    { name: dict.navigation.overview, href: `${base}`, icon: LayoutDashboard },
    {
      name: dict.navigation.projects,
      href: `${base}/projects`,
      icon: FileText,
    },
    { name: dict.navigation.contacts, href: `${base}/contacts`, icon: Users },
    {
      name: dict.navigation.formSubmissions,
      href: `${base}/form-submissions`,
      icon: Inbox,
    },
  ];
}

function buildProjectNavigation(base: string, dict: Dictionary): NavItem[] {
  return [
    { name: dict.navigation.overview, href: `${base}`, icon: LayoutDashboard },
    { name: dict.navigation.apiKey, href: `${base}/api-key`, icon: Key },
    {
      name: dict.navigation.analytics,
      href: `${base}/analytics`,
      icon: BarChart3,
    },
  ];
}

function buildAdminNavigation(base: string, dict: Dictionary): NavItem[] {
  return [
    { name: dict.navigation.overview, href: `${base}`, icon: LayoutDashboard },
    // { name: dict.navigation.users, href: `${base}/users`, icon: UserCog },
    {
      name: dict.navigation.organizations,
      href: `${base}/organizations`,
      icon: Mail,
    },
    {
      name: dict.navigation.analytics,
      href: `${base}/analytics`,
      icon: BarChart3,
    },
  ];
}

export function buildNavigation(
  pathname: string,
  dict: Dictionary,
  organizationId?: string,
  projectId?: string
) {
  const isAdmin = pathname.startsWith("/admin") || pathname.includes("/admin");
  if (isAdmin) {
    return buildAdminNavigation(buildBasePath(pathname, "admin"), dict);
  }

  const isProjectDashboard =
    (pathname.startsWith("/dashboard/") || pathname.includes("/dashboard/")) &&
    Boolean(organizationId) &&
    Boolean(projectId);
  if (isProjectDashboard && organizationId && projectId) {
    return buildProjectNavigation(
      buildProjectBasePath(pathname, organizationId, projectId),
      dict
    );
  }

  const isOrgDashboard =
    (pathname.startsWith("/dashboard/") || pathname.includes("/dashboard/")) &&
    Boolean(organizationId);
  if (isOrgDashboard && organizationId) {
    return buildOrganizationNavigation(
      buildOrgBasePath(pathname, organizationId),
      dict
    );
  }

  return buildDashboardNavigation(buildBasePath(pathname, "dashboard"), dict);
}

export function createIsActive(pathname: string, navigation: NavItem[]) {
  return (href: string) => {
    // Exact match always wins
    if (pathname === href) {
      return true;
    }

    // Check if pathname starts with href + "/"
    if (pathname.startsWith(`${href}/`)) {
      // Only match if there's no more specific navigation item that also matches
      const moreSpecificMatch = navigation.find(
        (item) =>
          (item.href !== href &&
            item.href.startsWith(`${href}/`) &&
            pathname.startsWith(`${item.href}/`)) ||
          pathname === item.href
      );

      // Only return true if no more specific match exists
      return !moreSpecificMatch;
    }

    return false;
  };
}
