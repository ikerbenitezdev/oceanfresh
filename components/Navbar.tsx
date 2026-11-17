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
    <div ref={dropdownRef} className={`relative ${mobile ? "w-full max-w-[220px]" : ""}`}>
      <div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          className={`flex min-h-11 items-center justify-between gap-2 rounded-full border border-white/30 px-4 text-[18px] font-medium text-white transition-colors hover:bg-white/10 ${mobile ? "w-full" : ""}`}
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
          className={`absolute ${mobile ? "left-0 right-0" : "end-0 min-w-[180px]"} top-full z-50 mt-2 overflow-hidden rounded-xl bg-white py-1 text-[#1f2b4d] shadow-[0_12px_32px_rgba(11,31,73,.22)]`}
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
                className={`flex min-h-11 w-full items-center gap-3 px-4 text-start text-[18px] transition-colors ${
                  isActive ? "bg-[#eef1f7] font-medium" : "hover:bg-[#f4f4f2]"
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
    <nav className="nav fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-[#0b1f49] text-white" dir={dir}>
      <div className="site-wrap">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="OceanFresh Logo"
              width={128}
              height={128}
              className="h-16 w-16 object-contain rounded-full bg-white p-0.5"
              priority
            />
            <span className="text-[28px] font-semibold tracking-tight">OceanFresh</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
            <Link href="/" className="whitespace-nowrap text-[18px] font-medium text-white decoration-1 underline-offset-[6px] hover:underline">
              {t.home}
            </Link>
            <Link href="/productos" className="whitespace-nowrap text-[18px] font-medium text-white decoration-1 underline-offset-[6px] hover:underline">
              {t.catalog}
            </Link>
            <Link href="/#quienes-somos" className="whitespace-nowrap text-[18px] font-medium text-white decoration-1 underline-offset-[6px] hover:underline">
              {t.about}
            </Link>

            <LanguageDropdown locale={locale} label={t.language} onChange={handleLocaleChange} />

            <Link
              href="/contacto"
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-[#f7941d] px-6 text-[18px] font-medium text-[#1f2b4d] transition-[background-color,transform] hover:bg-[#e2861a] active:scale-[.985]"
            >
              {t.contact}
            </Link>
          </div>

          <button
            className="lg:hidden -me-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.menu}
            aria-expanded={menuOpen}
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
          <div className="lg:hidden flex flex-col items-center gap-1 border-t border-white/15 py-4 text-center">
            <Link href="/" className="inline-flex min-h-11 items-center px-4 text-lg font-medium text-white hover:underline underline-offset-[6px]" onClick={() => setMenuOpen(false)}>
              {t.home}
            </Link>
            <Link href="/productos" className="inline-flex min-h-11 items-center px-4 text-lg font-medium text-white hover:underline underline-offset-[6px]" onClick={() => setMenuOpen(false)}>
              {t.catalog}
            </Link>
            <Link href="/#quienes-somos" className="inline-flex min-h-11 items-center px-4 text-lg font-medium text-white hover:underline underline-offset-[6px]" onClick={() => setMenuOpen(false)}>
              {t.about}
            </Link>

            <div className="flex w-full justify-center pt-2">
              <LanguageDropdown locale={locale} label={t.language} onChange={handleLocaleChange} mobile />
            </div>

            <Link
              href="/contacto"
              className="mt-2 inline-flex min-h-11 items-center rounded-full bg-[#f7941d] px-6 text-lg font-medium text-[#1f2b4d] transition-colors hover:bg-[#e2861a]"
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
