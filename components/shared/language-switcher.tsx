"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { getPathForLocale } from "@/lib/i18n/get-path-for-locale";
import { locales } from "@/lib/i18n/locale";
import { getLocaleFromPathname } from "@/lib/utils/pathname";
import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ICON_SIZE = 16;

function LanguageSwitcherContent() {
  const dict = useDictionary();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const locale = getLocaleFromPathname(pathname);
  const search = searchParams.toString();
  const querySuffix = search ? `?${search}` : "";

  if (!mounted) {
    return null;
  }

  const labels = dict.components.languageSwitcher;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={labels.label}
          className="gap-1.5 font-normal text-muted-foreground"
        >
          <Globe size={ICON_SIZE} className="shrink-0" />
          <span className="uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="end">
        {locales.map((loc) => (
          <DropdownMenuItem key={loc} asChild>
            <Link
              href={getPathForLocale(pathname, loc) + querySuffix}
              hrefLang={loc}
              lang={loc}
              className={locale === loc ? "font-medium" : "font-normal"}
            >
              {loc === "en" ? labels.english : labels.portuguese}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageSwitcher() {
  return (
    <Suspense
      fallback={
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="gap-1.5"
          aria-hidden
        >
          <Globe size={ICON_SIZE} />
        </Button>
      }
    >
      <LanguageSwitcherContent />
    </Suspense>
  );
}
