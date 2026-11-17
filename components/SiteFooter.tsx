"use client";

import Image from "next/image";
import Link from "next/link";
import { getDirection, type Locale } from "@/lib/locale";
import { useLocale } from "@/lib/locale-client";

type FooterCopy = {
  mapBadge: string;
  mapTitle: string;
  mapDescription: string;
  mapButton: string;
  navTitle: string;
  exportTitle: string;
  exportItems: string[];
  contactTitle: string;
  contactDescription: string;
  contactButton: string;
  brandDescription: string;
  home: string;
  catalog: string;
  about: string;
  contact: string;
  legalNotice: string;
  privacyPolicy: string;
  cookiesPolicy: string;
  copyright: string;
};

const copyByLocale: Record<Locale, FooterCopy> = {
  es: {
    mapBadge: "Nuestro punto de origen",
    mapTitle: "Puerto de Nouadhibou",
    mapDescription:
      "Desde este puerto estratégico en Mauritania coordinamos la recepción, inspección y expedición para exportación internacional.",
    mapButton: "Ver ubicación en Google Maps",
    navTitle: "Navegación",
    exportTitle: "Exportación",
    exportItems: [
      "Certificación sanitaria ONISPA",
      "Documentación para mercado europeo",
      "Trazabilidad desde origen",
      "Formatos según necesidad del cliente",
    ],
    contactTitle: "Hablemos",
    contactDescription:
      "Solicita catálogo actualizado, disponibilidad y condiciones de envío.",
    contactButton: "Solicitar información",
    brandDescription:
      "Importación directa de pescado y marisco desde Mauritania, con cadena de frío certificada y trazabilidad completa.",
    home: "Inicio",
    catalog: "Catálogo",
    about: "Quiénes Somos",
    contact: "Contacto",
    legalNotice: "Aviso legal",
    privacyPolicy: "Política de privacidad",
    cookiesPolicy: "Política de cookies",
    copyright: "Todos los derechos reservados.",
  },
  en: {
    mapBadge: "Our origin point",
    mapTitle: "Port of Nouadhibou",
    mapDescription:
      "From this strategic port in Mauritania, we coordinate receiving, inspection, and shipment for international export.",
    mapButton: "Open in Google Maps",
    navTitle: "Navigation",
    exportTitle: "Export",
    exportItems: [
      "ONISPA sanitary certification",
      "Documentation for European market",
      "Traceability from origin",
      "Formats adapted to buyer needs",
    ],
    contactTitle: "Let's talk",
    contactDescription:
      "Request the updated catalog, availability, and shipping conditions.",
    contactButton: "Request information",
    brandDescription:
      "Direct fish and seafood import from Mauritania, with certified cold chain and full traceability.",
    home: "Home",
    catalog: "Catalog",
    about: "About Us",
    contact: "Contact",
    legalNotice: "Legal notice",
    privacyPolicy: "Privacy policy",
    cookiesPolicy: "Cookies policy",
    copyright: "All rights reserved.",
  },
  fr: {
    mapBadge: "Notre point d'origine",
    mapTitle: "Port de Nouadhibou",
    mapDescription:
      "Depuis ce port strategique en Mauritanie, nous coordonnons la reception, l'inspection et l'expedition pour l'export international.",
    mapButton: "Voir sur Google Maps",
    navTitle: "Navigation",
    exportTitle: "Export",
    exportItems: [
      "Certification sanitaire ONISPA",
      "Documents pour le marche europeen",
      "Tracabilite depuis l'origine",
      "Formats selon les besoins du client",
    ],
    contactTitle: "Parlons-en",
    contactDescription:
      "Demandez le catalogue a jour, la disponibilite et les conditions d'expedition.",
    contactButton: "Demander des informations",
    brandDescription:
      "Import direct de poisson et fruits de mer depuis la Mauritanie, avec chaine du froid certifiee et tracabilite complete.",
    home: "Accueil",
    catalog: "Catalogue",
    about: "Qui sommes-nous",
    contact: "Contact",
    legalNotice: "Mentions legales",
    privacyPolicy: "Politique de confidentialite",
    cookiesPolicy: "Politique de cookies",
    copyright: "Tous droits reserves.",
  },
  ar: {
    mapBadge: "نقطة الانطلاق",
    mapTitle: "ميناء نواذيبو",
    mapDescription:
      "من هذا الميناء الاستراتيجي في موريتانيا ننسق الاستقبال والتفتيش والشحن للتصدير الدولي.",
    mapButton: "عرض الموقع على خرائط Google",
    navTitle: "التنقل",
    exportTitle: "التصدير",
    exportItems: [
      "شهادة صحية من ONISPA",
      "وثائق مطابقة للسوق الاوروبية",
      "تتبع كامل من المصدر",
      "اشكال تعبئة حسب طلب العميل",
    ],
    contactTitle: "لنتحدث",
    contactDescription: "اطلب الكتالوج المحدث والتوفر وشروط الشحن.",
    contactButton: "طلب معلومات",
    brandDescription:
      "استيراد مباشر للاسماك والمأكولات البحرية من موريتانيا مع سلسلة تبريد معتمدة وتتبع كامل.",
    home: "الرئيسية",
    catalog: "المنتجات",
    about: "من نحن",
    contact: "اتصل بنا",
    legalNotice: "الاشعار القانوني",
    privacyPolicy: "سياسة الخصوصية",
    cookiesPolicy: "سياسة ملفات تعريف الارتباط",
    copyright: "جميع الحقوق محفوظة.",
  },
};

const MAP_URL = "https://www.google.com/maps?q=Port%20de%20Nouadhibou%20Mauritania";

/*
  The site footer, on every page: the same .site-wrap as the Navbar and the home page, one dark ground,
  the 12-column grid split on the same line as the home page (column 7). Row 1: the port and its map.
  Row 2: the company and its contact button, then the two link columns. Row 3: legal links and copyright.
  Every link is 44px tall on a phone; text is solid colour for contrast on the dark ground.
*/
export default function SiteFooter() {
  const locale = useLocale();
  const t = copyByLocale[locale];
  const dir = getDirection(locale);

  const link =
    "inline-flex min-h-11 items-center text-white underline-offset-4 decoration-1 hover:underline lg:min-h-9";

  return (
    <footer className="site-footer bg-[#0b1f49] text-white" dir={dir} lang={locale}>
      <div className="site-wrap">
        {/* row 1: the port of origin, text beside the map */}
        <div className="grid grid-cols-1 gap-y-8 gap-x-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 lg:pe-12">
            <p className="text-base font-medium text-[#c9d3e6]">{t.mapBadge}</p>
            <h2 className="font-display mt-3 text-[clamp(34px,3.8vw,56px)] leading-[1.1]">
              {t.mapTitle}
            </h2>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-[#c9d3e6]">{t.mapDescription}</p>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center rounded-full border-[1.5px] border-white px-6 text-lg font-medium text-white transition-[background-color,transform] hover:bg-white/10 active:scale-[.985]"
            >
              {t.mapButton}
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl bg-[#13295c] lg:col-span-6">
            <iframe
              title={t.mapTitle}
              src={`${MAP_URL}&output=embed`}
              className="block h-[280px] w-full lg:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* row 2: the company, then the links */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/20 pt-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-6 lg:pe-12">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt=""
                width={66}
                height={66}
                className="h-12 w-12 rounded-full bg-white object-contain p-0.5"
              />
              <span className="text-2xl font-semibold tracking-tight">OceanFresh</span>
            </div>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-[#c9d3e6]">{t.brandDescription}</p>
            <p className="mt-2 max-w-[52ch] text-lg leading-relaxed text-[#c9d3e6]">{t.contactDescription}</p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#f7941d] px-6 text-lg font-medium text-[#1f2b4d] transition-[background-color,transform] hover:bg-[#e2861a] active:scale-[.985]"
            >
              {t.contactButton}
            </Link>
          </div>

          <nav aria-label={t.navTitle} className="lg:col-span-3">
            <h3 className="text-base font-medium text-[#c9d3e6]">{t.navTitle}</h3>
            <ul className="mt-3 text-lg">
              <li><Link href="/" className={link}>{t.home}</Link></li>
              <li><Link href="/productos" className={link}>{t.catalog}</Link></li>
              <li><Link href="/#quienes-somos" className={link}>{t.about}</Link></li>
              <li><Link href="/contacto" className={link}>{t.contact}</Link></li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-base font-medium text-[#c9d3e6]">{t.exportTitle}</h3>
            <ul className="mt-3 space-y-3 pt-2 text-lg leading-snug text-white">
              {t.exportItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* row 3: legal links and copyright */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 py-6 text-base sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6">
            <li><Link href="/aviso-legal" className={link}>{t.legalNotice}</Link></li>
            <li><Link href="/politica-privacidad" className={link}>{t.privacyPolicy}</Link></li>
            <li><Link href="/politica-cookies" className={link}>{t.cookiesPolicy}</Link></li>
          </ul>
          <p className="text-[#c9d3e6]">
            © {new Date().getFullYear()} OceanFresh. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
