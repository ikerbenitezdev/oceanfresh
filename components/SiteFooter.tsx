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
  copyright: string;
};

const copyByLocale: Record<Locale, FooterCopy> = {
  es: {
    mapBadge: "Nuestro punto de origen",
    mapTitle: "Puerto de Nouadhibou",
    mapDescription:
      "Desde este puerto estrategico en Mauritania coordinamos la recepcion, inspeccion y expedicion para exportacion internacional.",
    mapButton: "Ver ubicacion en Google Maps",
    navTitle: "Navegacion",
    exportTitle: "Exportacion",
    exportItems: [
      "Certificacion sanitaria ONISPA",
      "Documentacion para mercado europeo",
      "Trazabilidad desde origen",
      "Formatos segun necesidad del cliente",
    ],
    contactTitle: "Hablemos",
    contactDescription:
      "Solicita catalogo actualizado, disponibilidad y condiciones de envio.",
    contactButton: "Solicitar informacion",
    brandDescription:
      "Importacion directa de pescado y marisco desde Mauritania, con cadena de frio certificada y trazabilidad completa.",
    home: "Inicio",
    catalog: "Catalogo",
    about: "Quienes Somos",
    contact: "Contacto",
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
    copyright: "جميع الحقوق محفوظة.",
  },
};

export default function SiteFooter() {
  const locale = useLocale();
  const t = copyByLocale[locale];
  const dir = getDirection(locale);

  return (
    <>
      <section className="mt-16 bg-slate-100 text-slate-900 py-14" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              {t.mapBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4">{t.mapTitle}</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">{t.mapDescription}</p>
            <a
              href="https://www.google.com/maps?q=Port%20de%20Nouadhibou%20Mauritania"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t.mapButton}
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
            <iframe
              title="Mapa del puerto de Nouadhibou"
              src="https://www.google.com/maps?q=Port%20de%20Nouadhibou%20Mauritania&output=embed"
              className="w-full h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-b from-blue-950 to-blue-900 text-white pt-14 pb-8" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.jpeg"
                  alt="OceanFresh Logo"
                  width={66}
                  height={66}
                  className="h-14 w-14 object-contain rounded-full bg-white p-0.5"
                />
                <span className="text-xl font-bold">OceanFresh</span>
              </div>
              <p className="text-sm text-blue-100/90 mt-4 leading-relaxed">{t.brandDescription}</p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-blue-200 font-semibold mb-4">{t.navTitle}</h3>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block hover:text-blue-300 transition-colors">{t.home}</Link>
                <Link href="/productos" className="block hover:text-blue-300 transition-colors">{t.catalog}</Link>
                <Link href="/#quienes-somos" className="block hover:text-blue-300 transition-colors">{t.about}</Link>
                <Link href="/contacto" className="block hover:text-blue-300 transition-colors">{t.contact}</Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-blue-200 font-semibold mb-4">{t.exportTitle}</h3>
              <div className="space-y-2 text-sm text-blue-100/90">
                {t.exportItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-blue-200 font-semibold mb-4">{t.contactTitle}</h3>
              <p className="text-sm text-blue-100/90 mb-4">{t.contactDescription}</p>
              <Link
                href="/contacto"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                {t.contactButton}
              </Link>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-10 pt-6 text-center text-xs text-blue-200/90">
            © {new Date().getFullYear()} OceanFresh. {t.copyright}
          </div>
        </div>
      </footer>
    </>
  );
}
