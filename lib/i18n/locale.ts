// export const locales = ['en', 'pt'] as const;
export const locales = ['pt'] as const;
export const defaultLocale = 'pt' as const;

export type Locale = typeof locales[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
