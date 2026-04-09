"use client";

import type { NavigationDictionary } from "./dashboard-sidebar.model";
import { DashboardSidebarView } from "./dashboard-sidebar.view";
import { useDashboardSidebarViewModel } from "./dashboard-sidebar.view-model";

type DashboardSidebarProps = {
  dict: NavigationDictionary;
};

export default function DashboardSidebar({ dict }: DashboardSidebarProps) {
  const { groups, isActive } = useDashboardSidebarViewModel(dict);

  return <DashboardSidebarView groups={groups} isActive={isActive} />;
}
