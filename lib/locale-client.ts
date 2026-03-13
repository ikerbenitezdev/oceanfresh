"use client";

import { useEffect, useState } from "react";
import { type Locale, normalizeLocale } from "@/lib/locale";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "es";

  const cookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("locale="));

  const raw = cookie?.split("=")[1];
  return normalizeLocale(raw);
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    setLocale(readLocaleCookie());

    const handleLocaleChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ locale?: string }>;
      setLocale(normalizeLocale(customEvent.detail?.locale));
    };

    window.addEventListener("locale-changed", handleLocaleChange as EventListener);

    return () => {
      window.removeEventListener("locale-changed", handleLocaleChange as EventListener);
    };
  }, []);

  return locale;
}

export function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;

  document.cookie = `locale=${locale}; path=/; max-age=31536000; samesite=lax`;

  window.dispatchEvent(
    new CustomEvent("locale-changed", {
      detail: { locale },
    })
  );
}
