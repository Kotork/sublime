import "server-only";
import type { Locale } from "@/lib/i18n/locale";

const dictionaries = {
  en: () => import("../../dictionaries/en.json").then((module) => module.default),
  pt: () => import("../../dictionaries/pt.json").then((module) => module.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => {
  if (!hasLocale(locale)) {
    throw new Error(`Locale ${locale} is not supported`);
  }
  return dictionaries[locale]();
};
