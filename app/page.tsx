"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import productos from "@/data/productos.json";
import { getDirection, type Locale } from "@/lib/locale";
import { useLocale } from "@/lib/locale-client";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

type HomeCopy = {
  heroBadge: string;
  heroTitleStart: string;
  heroTitleAccent: string;
  heroDescription: string;
  heroCatalogButton: string;
  heroLicenseButton: string;
  stats: Array<{ value: string; label: string }>;
  certBadge: string;
  certTitle: string;
  certDescription: string;
  certCards: Array<{ icon: string; title: string; desc: string }>;
  certCtaTitle: string;
  certCtaDesc: string;
  certCtaButton: string;
  companyBadge: string;
  companyTitle: string;
  missionTitle: string;
  missionDescription: string;
  valueTitle: string;
  valueItems: string[];
  contactUs: string;
  catalogBadge: string;
  catalogTitle: string;
  catalogDescription: string;
  fullCatalog: string;
};

const homeCopy: Record<Locale, HomeCopy> = {
  es: {
    heroBadge: "Importacion directa • Banco Pesquero de Mauritania",
    heroTitleStart: "Exportamos calidad, desde las aguas de",
    heroTitleAccent: "Mauritania al mundo",
    heroDescription:
      "Pescado fresco y congelado de alta calidad procedente directamente del caladero mas rico del oceano Atlantico.",
    heroCatalogButton: "Ver Catalogo",
    heroLicenseButton: "Obtener Licencia",
    stats: [
      { value: "+65", label: "Especies disponibles" },
      { value: "48h", label: "Del mar a la lonja" },
      { value: "100%", label: "Trazabilidad certificada" },
      { value: "+20", label: "Paises de exportacion" },
    ],
    certBadge: "Garantias de calidad",
    certTitle: "Certificado y Trazable",
    certDescription:
      "Todo nuestro pescado es inspeccionado y certificado por ONISPA, organismo oficial de Mauritania para el control sanitario pesquero.",
    certCards: [
      {
        icon: "🇪🇺",
        title: "Valido para exportacion a Europa",
        desc: "Certificados sanitarios reconocidos por la Union Europea para importacion de productos pesqueros.",
      },
      {
        icon: "🔍",
        title: "Inspeccion en origen - ONISPA",
        desc: "Cada lote se inspecciona fisicamente en lonja antes de ser autorizado para exportacion.",
      },
      {
        icon: "📦",
        title: "Trazabilidad del mar a la exportacion",
        desc: "Registro completo de barco, zona de captura, fecha, frio y lote para cada envio.",
      },
    ],
    certCtaTitle: "Necesitas certificados para tu importacion?",
    certCtaDesc: "Enviamos certificado ONISPA, EUR.1, declaracion de origen y ficha HACCP.",
    certCtaButton: "Solicitar documentacion",
    companyBadge: "Nuestra empresa",
    companyTitle: "Quienes Somos",
    missionTitle: "Nuestra Mision",
    missionDescription:
      "Conectar la riqueza del banco pesquero de Mauritania con los mercados internacionales, garantizando frescura y sostenibilidad desde origen hasta destino.",
    valueTitle: "Nuestro Valor Diferencial",
    valueItems: [
      "Seleccion en lonja directamente en el punto de descarga.",
      "Cadena de frio certificada de +2 C a -18 C desde el barco.",
      "Exportacion directa sin intermediarios innecesarios.",
      "Documentacion HACCP, EUR1 y certificados sanitarios incluidos.",
    ],
    contactUs: "Contacta con nosotros",
    catalogBadge: "Lo mas solicitado",
    catalogTitle: "Nuestro Catalogo",
    catalogDescription:
      "Especies seleccionadas directamente en los puertos mauritanos con maxima frescura y control de calidad.",
    fullCatalog: "Ver catalogo completo",
  },
  en: {
    heroBadge: "Direct import • Mauritania Fishing Bank",
    heroTitleStart: "We export quality, from the waters of",
    heroTitleAccent: "Mauritania to the world",
    heroDescription:
      "Premium fresh and frozen fish sourced directly from one of the richest Atlantic fishing grounds.",
    heroCatalogButton: "View Catalog",
    heroLicenseButton: "Get Fishing License",
    stats: [
      { value: "+65", label: "Available species" },
      { value: "48h", label: "From sea to market" },
      { value: "100%", label: "Certified traceability" },
      { value: "+20", label: "Export countries" },
    ],
    certBadge: "Quality guarantees",
    certTitle: "Certified and Traceable",
    certDescription:
      "All our fish is inspected and certified by ONISPA, Mauritania's official authority for fish health control.",
    certCards: [
      {
        icon: "🇪🇺",
        title: "Valid for export to Europe",
        desc: "Health certificates recognized by the European Union for fish imports.",
      },
      {
        icon: "🔍",
        title: "Inspection at origin - ONISPA",
        desc: "Every lot is physically inspected at landing before export authorization.",
      },
      {
        icon: "📦",
        title: "Traceability from sea to export",
        desc: "Full tracking of vessel, area, date, cold chain and lot for every shipment.",
      },
    ],
    certCtaTitle: "Need certificates for your imports?",
    certCtaDesc: "We provide ONISPA certificate, EUR.1, origin declaration and HACCP sheet.",
    certCtaButton: "Request documents",
    companyBadge: "Our company",
    companyTitle: "About Us",
    missionTitle: "Our Mission",
    missionDescription:
      "To connect Mauritania's fishing wealth with international markets, ensuring freshness and sustainability from origin to destination.",
    valueTitle: "Our Competitive Value",
    valueItems: [
      "Direct fish-market selection at landing point.",
      "Certified cold chain from +2 C to -18 C from vessel onward.",
      "Direct export without unnecessary intermediaries.",
      "HACCP, EUR1 and sanitary documentation included.",
    ],
    contactUs: "Contact us",
    catalogBadge: "Most requested",
    catalogTitle: "Our Catalog",
    catalogDescription:
      "Species selected directly from Mauritanian ports with maximum freshness and quality control.",
    fullCatalog: "View full catalog",
  },
  fr: {
    heroBadge: "Import direct • Banc de peche mauritanien",
    heroTitleStart: "Nous exportons la qualite, des eaux de",
    heroTitleAccent: "Mauritanie vers le monde",
    heroDescription:
      "Poisson frais et congele de haute qualite provenant directement d'une des zones de peche les plus riches de l'Atlantique.",
    heroCatalogButton: "Voir le catalogue",
    heroLicenseButton: "Obtenir une licence",
    stats: [
      { value: "+65", label: "Especes disponibles" },
      { value: "48h", label: "De la mer au marche" },
      { value: "100%", label: "Tracabilite certifiee" },
      { value: "+20", label: "Pays d'exportation" },
    ],
    certBadge: "Garanties qualite",
    certTitle: "Certifie et tracable",
    certDescription:
      "Tous nos produits sont inspectes et certifies par l'ONISPA, autorite officielle de controle sanitaire en Mauritanie.",
    certCards: [
      {
        icon: "🇪🇺",
        title: "Valable pour l'export vers l'Europe",
        desc: "Certificats sanitaires reconnus par l'Union europeenne pour l'importation.",
      },
      {
        icon: "🔍",
        title: "Inspection a l'origine - ONISPA",
        desc: "Chaque lot est inspecte physiquement en criée avant autorisation d'export.",
      },
      {
        icon: "📦",
        title: "Tracabilite de la mer a l'export",
        desc: "Suivi complet du navire, zone, date, chaine du froid et lot de livraison.",
      },
    ],
    certCtaTitle: "Besoin de certificats pour importer ?",
    certCtaDesc: "Nous envoyons certificat ONISPA, EUR.1, declaration d'origine et fiche HACCP.",
    certCtaButton: "Demander les documents",
    companyBadge: "Notre entreprise",
    companyTitle: "Qui sommes-nous",
    missionTitle: "Notre mission",
    missionDescription:
      "Connecter la richesse halieutique mauritanienne aux marches internationaux en garantissant fraicheur et durabilite.",
    valueTitle: "Notre valeur differenciante",
    valueItems: [
      "Selection directe en criée au point de debarquement.",
      "Chaine du froid certifiee de +2 C a -18 C depuis le bateau.",
      "Exportation directe sans intermediaires inutiles.",
      "Documents HACCP, EUR1 et certificats sanitaires inclus.",
    ],
    contactUs: "Contactez-nous",
    catalogBadge: "Les plus demandes",
    catalogTitle: "Notre catalogue",
    catalogDescription:
      "Especes selectionnees directement dans les ports mauritaniens avec fraicheur maximale et controle qualite.",
    fullCatalog: "Voir le catalogue complet",
  },
  ar: {
    heroBadge: "استيراد مباشر • المصايد الموريتانية",
    heroTitleStart: "نصدر الجودة من مياه",
    heroTitleAccent: "موريتانيا الى العالم",
    heroDescription:
      "اسماك طازجة ومجمدة بجودة عالية من اغنى مناطق الصيد في المحيط الاطلسي.",
    heroCatalogButton: "عرض الكتالوج",
    heroLicenseButton: "طلب رخصة صيد",
    stats: [
      { value: "+65", label: "نوعا متاحا" },
      { value: "48h", label: "من البحر الى السوق" },
      { value: "100%", label: "تتبع معتمد" },
      { value: "+20", label: "دولة تصدير" },
    ],
    certBadge: "ضمان الجودة",
    certTitle: "معتمد وقابل للتتبع",
    certDescription:
      "جميع منتجاتنا تخضع للتفتيش والشهادة من ONISPA، الجهة الرسمية للرقابة الصحية في موريتانيا.",
    certCards: [
      {
        icon: "🇪🇺",
        title: "صالح للتصدير الى اوروبا",
        desc: "شهادات صحية معترف بها من الاتحاد الاوروبي لاستيراد المنتجات البحرية.",
      },
      {
        icon: "🔍",
        title: "تفتيش عند المصدر - ONISPA",
        desc: "يتم فحص كل شحنة فعليا قبل اعتمادها للتصدير.",
      },
      {
        icon: "📦",
        title: "تتبع من البحر حتى التصدير",
        desc: "توثيق كامل للسفينة والمنطقة والتاريخ وسلسلة التبريد ورقم الدفعة.",
      },
    ],
    certCtaTitle: "هل تحتاج شهادات للاستيراد؟",
    certCtaDesc: "نوفر شهادة ONISPA و EUR.1 وشهادة المنشأ وملف HACCP.",
    certCtaButton: "طلب الوثائق",
    companyBadge: "شركتنا",
    companyTitle: "من نحن",
    missionTitle: "مهمتنا",
    missionDescription:
      "ربط الثروة البحرية الموريتانية بالاسواق الدولية مع ضمان الجودة والاستدامة من المصدر حتى التسليم.",
    valueTitle: "قيمتنا المضافة",
    valueItems: [
      "اختيار مباشر من الميناء عند التفريغ.",
      "سلسلة تبريد معتمدة من +2 الى -18 درجة مئوية.",
      "تصدير مباشر دون وسطاء غير ضروريين.",
      "توثيق HACCP و EUR1 والشهادات الصحية.",
    ],
    contactUs: "تواصل معنا",
    catalogBadge: "الاكثر طلبا",
    catalogTitle: "كتالوجنا",
    catalogDescription: "اصناف مختارة مباشرة من الموانئ الموريتانية باعلى درجات الجودة.",
    fullCatalog: "عرض الكتالوج الكامل",
  },
};

export default function Home() {
  const locale = useLocale();
  const t = homeCopy[locale];
  const dir = getDirection(locale);
  const preview = productos.slice(0, 3);

  return (
    <div dir={dir}>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/fondo.webp"
          alt="Pesca artesanal en Mauritania"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-950/50" />
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.span
            className="inline-block bg-blue-500/20 border border-blue-400/40 text-blue-200 text-sm font-medium px-4 py-1 rounded-full mb-6 tracking-wide uppercase"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {t.heroBadge}
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {t.heroTitleStart}{" "}
            <span className="text-blue-300">{t.heroTitleAccent}</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {t.heroDescription}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link
              href="/productos"
              className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              {t.heroCatalogButton}
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors backdrop-blur-sm"
            >
              🪪 {t.heroLicenseButton}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <p className="text-3xl font-extrabold text-blue-300">{stat.value}</p>
              <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              {t.certBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              {t.certTitle}
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              {t.certDescription} {" "}
              <a
                href="https://www.onispa.mr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                ONISPA
              </a>
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.certCards.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-8 flex flex-col gap-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 bg-blue-900 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-white"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <p className="font-bold text-lg">{t.certCtaTitle}</p>
              <p className="text-blue-200 text-sm mt-1">
                {t.certCtaDesc}
              </p>
            </div>
            <a
              href="/contacto"
              className="shrink-0 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t.certCtaButton} →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section id="quienes-somos" className="py-20 bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              {t.companyBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              {t.companyTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-80 md:h-full min-h-80 rounded-2xl overflow-hidden shadow-xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <Image
                src="/puerto.webp"
                alt="Puerto de pesca en Mauritania"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="space-y-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              {/* Misión */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                    🎯
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t.missionTitle}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t.missionDescription}
                </p>
              </div>

              {/* Diferencial */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                    ⭐
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t.valueTitle}</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  {t.valueItems.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-2"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                    >
                      <span className="text-blue-500 mt-1 shrink-0">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contacto"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t.contactUs}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preview productos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              {t.catalogBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              {t.catalogTitle}
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              {t.catalogDescription}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {preview.map((producto, i) => (
              <motion.div
                key={producto.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/productos/${producto.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 block"
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-4">
                    <Image
                      src={producto.imagen_url}
                      alt={producto.nombre}
                      fill
                      className="object-contain p-4 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {producto.categoria}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                      {producto.nombre}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">📍 {producto.origen}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/productos"
              className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t.fullCatalog} →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
