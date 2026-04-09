"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  DEFAULT_SIDEBAR_BEHAVIOR,
  type SidebarBehavior,
} from "@/lib/user-preferences/sidebar-behavior";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { Suspense, useCallback, useEffect, useState } from "react";

import DashboardSidebar from "./dashboard-sidebar/dashboard-sidebar";
import type { NavigationDictionary } from "./dashboard-sidebar/dashboard-sidebar.model";

type DashboardSidebarShellProps = {
  children: React.ReactNode;
  dict: NavigationDictionary;
  initialSidebarBehavior: SidebarBehavior | null;
  canPersistSidebar: boolean;
};

export function DashboardSidebarShell({
  children,
  dict,
  initialSidebarBehavior,
  canPersistSidebar,
}: DashboardSidebarShellProps) {
  const isMobile = useIsMobile();
  const [sidebarBehavior, setSidebarBehavior] = useState<SidebarBehavior>(
    () => initialSidebarBehavior ?? DEFAULT_SIDEBAR_BEHAVIOR
  );

  useEffect(() => {
    setSidebarBehavior(initialSidebarBehavior ?? DEFAULT_SIDEBAR_BEHAVIOR);
  }, [initialSidebarBehavior]);

  const desktopLocked = !isMobile && sidebarBehavior !== "expand_on_hover";

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!desktopLocked) return;
      if (sidebarBehavior === "expanded" && !open) return;
      if (sidebarBehavior === "collapsed" && open) return;
    },
    [desktopLocked, sidebarBehavior]
  );

  const providerOpen = isMobile
    ? undefined
    : sidebarBehavior === "expanded"
    ? true
    : sidebarBehavior === "collapsed"
    ? false
    : undefined;

  const hoverToExpand = sidebarBehavior === "expand_on_hover";

  return (
    <SidebarProvider
      key={`${sidebarBehavior}-${isMobile ? "m" : "d"}`}
      defaultOpen={false}
      open={providerOpen}
      onOpenChange={desktopLocked ? onOpenChange : undefined}
      className="flex min-h-0 flex-1 overflow-hidden"
    >
      <DashboardSidebar
        dict={dict}
        sidebarBehavior={sidebarBehavior}
        onSidebarBehaviorChange={setSidebarBehavior}
        canPersistSidebar={canPersistSidebar}
        hoverToExpand={hoverToExpand}
      />
      <SidebarInset className="min-h-0 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <div className="container mx-auto flex flex-col gap-6 p-4 md:p-6">
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
