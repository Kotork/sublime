"use client";

import { createClient } from "@/lib/supabase/client";
import { getLocaleFromPathname } from "@/lib/utils/pathname";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Persists the URL locale when the user navigates between locales (not on initial mount).
 */
export function LocalePreferenceSync() {
  const pathname = usePathname();
  const trpc = useTRPC();
  const prevPathnameRef = useRef<string | null>(null);

  const { mutate } = useMutation(trpc.preferences.upsert.mutationOptions());

  useEffect(() => {
    const locale = getLocaleFromPathname(pathname);
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }
    if (prevPathnameRef.current === pathname) {
      return;
    }
    const prevLocale = getLocaleFromPathname(prevPathnameRef.current);
    prevPathnameRef.current = pathname;
    if (prevLocale === locale) {
      return;
    }

    const supabase = createClient();
    void supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      mutate({ locale });
    });
  }, [pathname, mutate]);

  return null;
}
