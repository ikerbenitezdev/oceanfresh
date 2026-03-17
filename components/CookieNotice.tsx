"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDirection, type Locale } from "@/lib/locale";
import { useLocale } from "@/lib/locale-client";

const NOTICE_COOKIE = "cookie_notice_closed";

type CookieCopy = {
  title: string;
  description: string;
  legalLink: string;
  cookiesLink: string;
  privacyLink: string;
  button: string;
};

const copyByLocale: Record<Locale, CookieCopy> = {
  es: {
    title: "Uso de cookies",
    description:
      "Esta web solo utiliza cookies técnicas y de preferencia, como la cookie de idioma. No usamos cookies publicitarias ni analíticas en este momento.",
    legalLink: "Aviso legal",
    cookiesLink: "Política de cookies",
    privacyLink: "Privacidad",
    button: "Entendido",
  },
  en: {
    title: "Cookies notice",
    description:
      "This website only uses technical and preference cookies, such as the language cookie. We are not currently using advertising or analytics cookies.",
    legalLink: "Legal notice",
    cookiesLink: "Cookies policy",
    privacyLink: "Privacy",
    button: "Understood",
  },
  fr: {
    title: "Utilisation des cookies",
    description:
      "Ce site utilise uniquement des cookies techniques et de preference, comme le cookie de langue. Nous n'utilisons pas actuellement de cookies publicitaires ou analytiques.",
    legalLink: "Mentions legales",
    cookiesLink: "Politique de cookies",
    privacyLink: "Confidentialite",
    button: "Compris",
  },
  ar: {
    title: "استخدام ملفات تعريف الارتباط",
    description:
      "يستخدم هذا الموقع فقط ملفات تعريف ارتباط تقنية وتفضيلية مثل ملف اللغة. لا نستخدم حاليا ملفات تحليلية او اعلانية.",
    legalLink: "الاشعار القانوني",
    cookiesLink: "سياسة ملفات تعريف الارتباط",
    privacyLink: "الخصوصية",
    button: "فهمت",
  },
};

function hasClosedNoticeCookie() {
  if (typeof document === "undefined") return false;

  return document.cookie
    .split(";")
    .map((item) => item.trim())
    .some((item) => item.startsWith(`${NOTICE_COOKIE}=`));
}

export default function CookieNotice() {
  const locale = useLocale();
  const dir = getDirection(locale);
  const t = copyByLocale[locale];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasClosedNoticeCookie());
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50" dir={dir}>
      <div className="mx-auto max-w-4xl rounded-2xl border border-blue-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-gray-900">{t.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{t.description}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <Link href="/aviso-legal" className="text-blue-600 hover:underline">
                {t.legalLink}
              </Link>
              <Link href="/politica-cookies" className="text-blue-600 hover:underline">
                {t.cookiesLink}
              </Link>
              <Link href="/politica-privacidad" className="text-blue-600 hover:underline">
                {t.privacyLink}
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              document.cookie = `${NOTICE_COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
              setVisible(false);
            }}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {t.button}
          </button>
        </div>
      </div>
    </div>
  );
}
