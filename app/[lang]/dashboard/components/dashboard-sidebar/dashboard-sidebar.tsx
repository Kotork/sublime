"use client";

import SidebarView from "./presentation/components/sidebar-view";
import { useSidebarNavigation } from "./application/hooks/use-sidebar-navigation";

const DashboardSidebar = () => {
  const { navigation, isActive } = useSidebarNavigation();

  return <SidebarView items={navigation} isActive={isActive} />;
};

export default DashboardSidebar;
