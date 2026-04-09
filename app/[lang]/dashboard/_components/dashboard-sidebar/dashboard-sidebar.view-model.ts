import { useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  buildNavigation,
  createIsActive,
  type NavGroup,
  type NavigationDictionary,
} from "./dashboard-sidebar.model";

export type DashboardSidebarViewModel = {
  groups: NavGroup[];
  isActive: (href: string) => boolean;
};

export function useDashboardSidebarViewModel(
  dict: NavigationDictionary
): DashboardSidebarViewModel {
  const pathname = usePathname();

  return useMemo(() => {
    const groups = buildNavigation(pathname, dict);
    const isActive = createIsActive(pathname, groups);

    return {
      groups,
      isActive,
    };
  }, [dict, pathname]);
}
