"use client";

import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/i18n/locale";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton({ label, lang }: { label: string; lang: Locale }) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${lang}/auth/login`);
  };

  return <Button onClick={logout}>{label}</Button>;
}
