export const SUPPORTED_LOCALES = ["es", "en", "fr", "ar"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "Espanol",
  en: "English",
  fr: "Francais",
  ar: "العربية",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  es: "https://flagcdn.com/w40/es.png",
  en: "https://flagcdn.com/w40/gb.png",
  fr: "https://flagcdn.com/w40/fr.png",
  ar: "https://flagcdn.com/w40/mr.png",
};

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return "es";
  const lower = value.toLowerCase();

  if (SUPPORTED_LOCALES.includes(lower as Locale)) {
    return lower as Locale;
  }

  return "es";
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
