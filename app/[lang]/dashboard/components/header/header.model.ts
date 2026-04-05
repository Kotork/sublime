import { getPathnameWithoutLocale } from "@/lib/utils/pathname";

export function getHomePath(pathSegments: string[]) {
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

export type HeaderState = {
  homePath: string;
  isDashboardRoute: boolean;
};

export function buildHeaderState(pathname: string): HeaderState {
  const pathSegments = pathname.split("/").filter(Boolean);
  const homePath = getHomePath(pathSegments);
  const isDashboardRoute = getPathnameWithoutLocale(pathname).startsWith(
    "/dashboard"
  );

  return { homePath, isDashboardRoute };
}
