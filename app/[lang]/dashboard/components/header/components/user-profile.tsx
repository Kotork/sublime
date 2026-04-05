"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LayoutDashboard, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getPathnameWithoutLocale, getLocaleFromPathname } from "@/lib/utils/pathname";

const UserProfile = () => {
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
    router.push("/login");
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
                Go to the dashboard
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Go to Admin
              </>
            )}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout}>
          <User className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
