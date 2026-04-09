"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LayoutDashboard, Shield, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getPathnameWithoutLocale, getLocaleFromPathname } from "@/lib/utils/pathname";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";

const UserProfile = () => {
  const dict = useDictionary();
  const labels = dict.components.userProfile;
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();
        if (userData) {
          setUserRole(userData.role);
        }
      }
    };
    fetchUserRole();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const handleNavigate = () => {
    const locale = getLocaleFromPathname(pathname);
    const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
    const localePrefix = locale ? `/${locale}` : "";

    if (pathnameWithoutLocale.startsWith("/admin")) {
      router.push(`${localePrefix}/dashboard`);
    } else if (pathnameWithoutLocale.startsWith("/dashboard")) {
      router.push(`${localePrefix}/admin`);
    }
    router.refresh();
  };

  const handleSettings = () => {
    const locale = getLocaleFromPathname(pathname);
    const localePrefix = locale ? `/${locale}` : "";
    router.push(`${localePrefix}/dashboard/settings`);
  };

  const isStaff = userRole === "staff";
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
  const isOnAdminRoute = pathnameWithoutLocale.startsWith("/admin");
  const isOnDashboardRoute = pathnameWithoutLocale.startsWith("/dashboard");
  const showNavigationItem = isStaff && (isOnAdminRoute || isOnDashboardRoute);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer border">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {showNavigationItem && (
          <DropdownMenuItem onClick={handleNavigate}>
            {isOnAdminRoute ? (
              <>
                <LayoutDashboard className="h-4 w-4" />
                {labels.goToDashboard}
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                {labels.goToAdmin}
              </>
            )}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleSettings}>
          <Settings className="h-4 w-4" />
          {labels.settings}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <User className="h-4 w-4" />
          {labels.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
