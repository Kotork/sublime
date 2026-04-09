import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { NavItem } from "./dashboard-sidebar.model";

type DashboardSidebarViewProps = {
  items: NavItem[];
  isActive: (href: string) => boolean;
};

export function DashboardSidebarView({
  items,
  isActive,
}: DashboardSidebarViewProps) {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent className="gap-0">
        <SidebarGroup className="pb-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {items.map((item) => (
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
      </SidebarContent>
    </Sidebar>
  );
}
