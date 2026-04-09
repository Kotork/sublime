"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { getPathForLocale } from "@/lib/i18n/get-path-for-locale";
import type { Locale } from "@/lib/i18n/locale";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const STORAGE_PREFIX = "locale-pref-banner-dismissed";

function LocalePreferenceBannerInner({
  savedLocale,
  currentLocale,
}: {
  savedLocale: Locale | null;
  currentLocale: string;
}) {
  const dict = useDictionary();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!savedLocale || savedLocale === currentLocale) {
      setVisible(false);
      return;
    }
    const key = `${STORAGE_PREFIX}:${savedLocale}:${currentLocale}`;
    if (sessionStorage.getItem(key)) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, [savedLocale, currentLocale]);

  if (!visible || !savedLocale) {
    return null;
  }

  const search = searchParams.toString();
  const querySuffix = search ? `?${search}` : "";
  const href = getPathForLocale(pathname, savedLocale) + querySuffix;

  const localeName =
    savedLocale === "en"
      ? dict.components.languageSwitcher.english
      : dict.components.languageSwitcher.portuguese;

  const message = dict.components.localePreferenceBanner.message.replace(
    "{locale}",
    localeName,
  );

  const dismiss = () => {
    const key = `${STORAGE_PREFIX}:${savedLocale}:${currentLocale}`;
    sessionStorage.setItem(key, "1");
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label={dict.components.localePreferenceBanner.ariaLabel}
      className="flex flex-col gap-3 border-b bg-muted/50 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-muted-foreground">{message}</p>
      <div className="flex shrink-0 gap-2">
        <Button size="sm" variant="secondary" onClick={() => router.push(href)}>
          {dict.components.localePreferenceBanner.switch}
        </Button>
        <Button size="sm" variant="ghost" onClick={dismiss}>
          {dict.components.localePreferenceBanner.dismiss}
        </Button>
      </div>
    </div>
  );
}

export function LocalePreferenceBanner({
  savedLocale,
  currentLocale,
}: {
  savedLocale: Locale | null;
  currentLocale: string;
}) {
  return (
    <Suspense fallback={null}>
      <LocalePreferenceBannerInner
        savedLocale={savedLocale}
        currentLocale={currentLocale}
      />
    </Suspense>
  );
}
