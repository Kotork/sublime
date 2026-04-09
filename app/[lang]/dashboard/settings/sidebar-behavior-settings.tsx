"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { createClient } from "@/lib/supabase/client";
import {
  DEFAULT_SIDEBAR_BEHAVIOR,
  type SidebarBehavior,
} from "@/lib/user-preferences/sidebar-behavior";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SidebarBehaviorSettingsProps = {
  initialSidebarBehavior: SidebarBehavior | null;
  canPersist: boolean;
};

export function SidebarBehaviorSettings({
  initialSidebarBehavior,
  canPersist,
}: SidebarBehaviorSettingsProps) {
  const dict = useDictionary();
  const settings = dict.pages.dashboard.settings;
  const nav = dict.navigation.sidebar;
  const router = useRouter();
  const trpc = useTRPC();

  const [value, setValue] = useState<SidebarBehavior>(
    () => initialSidebarBehavior ?? DEFAULT_SIDEBAR_BEHAVIOR
  );

  useEffect(() => {
    setValue(initialSidebarBehavior ?? DEFAULT_SIDEBAR_BEHAVIOR);
  }, [initialSidebarBehavior]);

  const save = useMutation(
    trpc.preferences.upsert.mutationOptions({
      onSettled: () => router.refresh(),
    })
  );

  const onValueChange = async (next: string) => {
    const b = next as SidebarBehavior;
    setValue(b);
    if (!canPersist) return;
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    save.mutate({ sidebar_behavior: b });
  };

  const labelOf = (v: SidebarBehavior) => {
    if (v === "expanded") return nav.expanded;
    if (v === "collapsed") return nav.collapsed;
    return nav.expandOnHover;
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="sidebar-behavior">{settings.sidebar}</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={!canPersist || save.isPending}
      >
        <SelectTrigger id="sidebar-behavior" className="w-full max-w-md">
          <SelectValue>{labelOf(value)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="expanded">{nav.expanded}</SelectItem>
          <SelectItem value="collapsed">{nav.collapsed}</SelectItem>
          <SelectItem value="expand_on_hover">{nav.expandOnHover}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
