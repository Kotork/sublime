"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import type { SidebarBehavior } from "@/lib/user-preferences/sidebar-behavior";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { PanelLeftDashed } from "lucide-react";
import { useRouter } from "next/navigation";

import type { NavigationDictionary } from "./dashboard-sidebar.model";

type SidebarBehaviorMenuProps = {
  dict: NavigationDictionary;
  value: SidebarBehavior;
  onChange: (value: SidebarBehavior) => void;
  canPersist: boolean;
};

export function SidebarBehaviorMenu({
  dict,
  value,
  onChange,
  canPersist,
}: SidebarBehaviorMenuProps) {
  const router = useRouter();
  const trpc = useTRPC();
  const save = useMutation(
    trpc.preferences.upsert.mutationOptions({
      onSettled: () => router.refresh(),
    }),
  );

  const onValueChange = async (next: string) => {
    const b = next as SidebarBehavior;
    onChange(b);
    if (!canPersist) return;
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    save.mutate({ sidebar_behavior: b });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          aria-label={dict.navigation.sidebar.menuTriggerAria}
        >
          <PanelLeftDashed className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-56">
        <DropdownMenuLabel className="font-normal text-muted-foreground">
          {dict.navigation.sidebar.menuTitle}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="expanded">
            {dict.navigation.sidebar.expanded}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="collapsed">
            {dict.navigation.sidebar.collapsed}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="expand_on_hover">
            {dict.navigation.sidebar.expandOnHover}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
