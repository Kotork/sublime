"use client";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type SettingsDict = {
  title: string;
  description: string;
  language: string;
  theme: string;
};

export function AccountSettingsForm({ dict }: { dict: SettingsDict }) {
  return (
    <div className="flex max-w-md flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{dict.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{dict.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label>{dict.language}</Label>
        <LanguageSwitcher />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label>{dict.theme}</Label>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
