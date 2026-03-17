"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  getDirection,
  LOCALE_FLAGS,
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  normalizeLocale,
  type Locale,
} from "@/lib/locale";
import { setLocaleCookie, useLocale } from "@/lib/locale-client";

const copyByLocale: Record<
  Locale,
  {
    home: string;
    catalog: string;
    about: string;
    contact: string;
    language: string;
    menu: string;
  }
> = {
  es: {
    home: "Inicio",
    catalog: "Catálogo",
    about: "Quiénes Somos",
    contact: "Contacto",
    language: "Idioma",
    menu: "Abrir menú",
  },
  en: {
    home: "Home",
    catalog: "Catalog",
    about: "About Us",
    contact: "Contact",
    language: "Language",
    menu: "Open menu",
  },
  fr: {
    home: "Accueil",
    catalog: "Catalogue",
    about: "Qui sommes-nous",
    contact: "Contact",
    language: "Langue",
    menu: "Ouvrir le menu",
  },
  ar: {
    home: "الرئيسية",
    catalog: "المنتجات",
    about: "من نحن",
    contact: "اتصل بنا",
    language: "اللغة",
    menu: "فتح القائمة",
  },
};

type LanguageDropdownProps = {
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
  mobile?: boolean;
};

function LanguageDropdown({ locale, label, onChange, mobile = false }: LanguageDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${mobile ? "w-[150px]" : "min-w-[132px]"}`}>
      <div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          className={`flex items-center justify-between gap-2 rounded-md border border-blue-500 bg-blue-700 px-2.5 py-1.5 text-xs text-white shadow-sm transition hover:bg-blue-600 ${mobile ? "w-full" : "min-w-[132px]"}`}
        >
          <span className="flex items-center gap-2">
            <Image
              src={LOCALE_FLAGS[locale]}
              alt=""
              width={20}
              height={15}
              className="h-[15px] w-5 rounded-[2px] object-cover"
            />
            <span>{LOCALE_LABELS[locale]}</span>
          </span>
          <svg
            className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          role="listbox"
          className={`absolute ${mobile ? "left-0 right-0" : "right-0"} top-full z-50 mt-2 overflow-hidden rounded-xl border border-blue-700 bg-blue-900 shadow-2xl`}
        >
          {SUPPORTED_LOCALES.map((code) => {
            const isActive = code === locale;

            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition ${
                  isActive ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-blue-800"
                }`}
              >
                <Image
                  src={LOCALE_FLAGS[code]}
                  alt=""
                  width={20}
                  height={15}
                  className="h-[15px] w-5 rounded-[2px] object-cover"
                />
                <span>{LOCALE_LABELS[code]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();
  const t = copyByLocale[locale];
  const dir = getDirection(locale);

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocaleCookie(normalizeLocale(nextLocale));
  };

  return (
    <nav className="bg-blue-800 text-white shadow-lg sticky top-0 z-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpeg"
              alt="OceanFresh Logo"
              width={66}
              height={66}
              className="h-14 w-14 object-contain rounded-full bg-white p-0.5"
              priority
            /> <span className="ml-3 text-xl font-bold tracking-tight">OceanFresh</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-blue-500 transition-colors text-md font-medium">
              {t.home}
            </Link>
            <Link href="/productos" className="text-white hover:text-blue-500 transition-colors text-md font-medium">
              {t.catalog}
            </Link>
            <Link href="/#quienes-somos" className="text-white hover:text-blue-500 transition-colors text-md font-medium">
              {t.about}
            </Link>

            <LanguageDropdown locale={locale} label={t.language} onChange={handleLocaleChange} />

            <Link
              href="/contacto"
              className="bg-blue-500 hover:bg-blue-400 text-white text-md font-semibold px-4 py-2 rounded-md transition-colors"
            >
              {t.contact}
            </Link>
          </div>

          <button
            className="md:hidden text-white hover:text-blue-500 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.menu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-blue-800 space-y-3 text-center">
            <Link href="/" className="block text-white hover:text-blue-500 py-1 text-sm font-medium text-center" onClick={() => setMenuOpen(false)}>
              {t.home}
            </Link>
            <Link href="/productos" className="block text-white hover:text-blue-500 py-1 text-sm font-medium text-center" onClick={() => setMenuOpen(false)}>
              {t.catalog}
            </Link>
            <Link href="/#quienes-somos" className="block text-white hover:text-blue-500 py-1 text-sm font-medium text-center" onClick={() => setMenuOpen(false)}>
              {t.about}
            </Link>

            <div className="pt-2 flex justify-center">
              <LanguageDropdown locale={locale} label={t.language} onChange={handleLocaleChange} mobile />
            </div>

            <Link
              href="/contacto"
              className="block bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors w-fit mx-auto"
              onClick={() => setMenuOpen(false)}
            >
              {t.contact}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
