"use client";

import { createClient } from "@/lib/supabase/client";
import { defaultLocale, type Locale } from "@/lib/i18n/locale";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/utils/pathname";

export function LogoutButton({ label }: { label: string }) {
  const router = useRouter();
  const lang = getLocaleFromPathname(window.location.pathname);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${lang}/auth/login`);
  };

  return <Button onClick={logout}>{label}</Button>;
}
