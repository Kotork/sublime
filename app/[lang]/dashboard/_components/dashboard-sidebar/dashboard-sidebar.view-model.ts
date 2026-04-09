import { useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  buildNavigation,
  createIsActive,
  type NavItem,
  type NavigationDictionary,
} from "./dashboard-sidebar.model";

export type DashboardSidebarViewModel = {
  navigation: NavItem[];
  isActive: (href: string) => boolean;
};

export function useDashboardSidebarViewModel(
  dict: NavigationDictionary
): DashboardSidebarViewModel {
  const pathname = usePathname();

  return useMemo(() => {
    const navigation = buildNavigation(pathname, dict);
    const isActive = createIsActive(pathname, navigation);

    return {
      navigation,
      isActive,
    };
  }, [dict, pathname]);
}
