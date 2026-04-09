import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { SidebarBehavior } from "@/lib/user-preferences/sidebar-behavior";

import type { NavGroup, NavigationDictionary } from "./dashboard-sidebar.model";
import { SidebarBehaviorMenu } from "./sidebar-behavior-menu";

type DashboardSidebarViewProps = {
  groups: NavGroup[];
  isActive: (href: string) => boolean;
  dict: NavigationDictionary;
  sidebarBehavior: SidebarBehavior;
  onSidebarBehaviorChange: (value: SidebarBehavior) => void;
  canPersistSidebar: boolean;
  hoverToExpand: boolean;
};

export function DashboardSidebarView({
  groups,
  isActive,
  dict,
  sidebarBehavior,
  onSidebarBehaviorChange,
  canPersistSidebar,
  hoverToExpand,
}: DashboardSidebarViewProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
      hoverToExpand={hoverToExpand}
      fullWidthSpacerWhenExpanded={sidebarBehavior === "expanded"}
    >
      <SidebarContent className="gap-0">
        {groups.map((group) => (
          <SidebarGroup key={group.title} className="pb-0">
            <SidebarGroupLabel className="text-[11px] uppercase tracking-wide">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      tooltip={item.name}
                      className="min-h-10 md:min-h-9"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarBehaviorMenu
          dict={dict}
          value={sidebarBehavior}
          onChange={onSidebarBehaviorChange}
          canPersist={canPersistSidebar}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
