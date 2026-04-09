"use client";

import type { SidebarBehavior } from "@/lib/user-preferences/sidebar-behavior";

import type { NavigationDictionary } from "./dashboard-sidebar.model";
import { DashboardSidebarView } from "./dashboard-sidebar.view";
import { useDashboardSidebarViewModel } from "./dashboard-sidebar.view-model";

type DashboardSidebarProps = {
  dict: NavigationDictionary;
  sidebarBehavior: SidebarBehavior;
  onSidebarBehaviorChange: (value: SidebarBehavior) => void;
  canPersistSidebar: boolean;
  hoverToExpand: boolean;
};

export default function DashboardSidebar({
  dict,
  sidebarBehavior,
  onSidebarBehaviorChange,
  canPersistSidebar,
  hoverToExpand,
}: DashboardSidebarProps) {
  const { groups, isActive } = useDashboardSidebarViewModel(dict);

  return (
    <DashboardSidebarView
      groups={groups}
      isActive={isActive}
      dict={dict}
      sidebarBehavior={sidebarBehavior}
      onSidebarBehaviorChange={onSidebarBehaviorChange}
      canPersistSidebar={canPersistSidebar}
      hoverToExpand={hoverToExpand}
    />
  );
}
