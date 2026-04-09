import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { NavGroup } from "./dashboard-sidebar.model";

type DashboardSidebarViewProps = {
  groups: NavGroup[];
  isActive: (href: string) => boolean;
};

export function DashboardSidebarView({
  groups,
  isActive,
}: DashboardSidebarViewProps) {
  return (
    <Sidebar collapsible="icon" className="border-r">
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
    </Sidebar>
  );
}
