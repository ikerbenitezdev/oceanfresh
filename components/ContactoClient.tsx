"use client";

import { getDirection, type Locale } from "@/lib/locale";
import { useLocale } from "@/lib/locale-client";

type ContactCopy = {
  badge: string;
  title: string;
  description: string;
  fullName: string;
  email: string;
  country: string;
  company: string;
  message: string;
  send: string;
  policy: string;
  contactInfo: string;
  emailTitle: string;
  phoneTitle: string;
  exportTitle: string;
  exportTo: string;
  whyChoose: string;
  reasons: string[];
  supportHours: string;
  weekdays: string;
  saturday: string;
  placeholders: {
    name: string;
    email: string;
    country: string;
    company: string;
    message: string;
  };
};

const copyByLocale: Record<Locale, ContactCopy> = {
  es: {
    badge: "Estamos disponibles",
    title: "Contacto",
    description:
      "Eres importador, distribuidor o trabajas en el sector HORECA? Cuentanos tus necesidades y te respondemos en menos de 24 horas.",
    fullName: "Nombre completo *",
    email: "Email *",
    country: "Pais *",
    company: "Empresa / Organizacion",
    message: "Mensaje *",
    send: "Enviar mensaje",
    policy:
      "Al enviar este formulario, aceptas nuestra politica de privacidad. Tus datos nunca seran cedidos a terceros.",
    contactInfo: "Informacion de contacto",
    emailTitle: "Email",
    phoneTitle: "Telefono / WhatsApp",
    exportTitle: "Exportamos a",
    exportTo: "UE, Asia, America del Norte y del Sur",
    whyChoose: "Por que elegirnos?",
    reasons: [
      "Seleccion en lonja directamente",
      "Cadena de frio certificada",
      "Exportacion directa sin intermediarios",
      "Documentacion sanitaria completa",
      "Respuesta en menos de 24 horas",
    ],
    supportHours: "Horario de atencion",
    weekdays: "Lunes - Viernes: 09:00 - 18:00 (CET)",
    saturday: "Sabados: 09:00 - 13:00 (CET)",
    placeholders: {
      name: "Tu nombre",
      email: "tu@empresa.com",
      country: "Espana, Francia, Italia...",
      company: "Nombre de tu empresa (opcional)",
      message: "Describe que producto te interesa, volumen aproximado, frecuencia de pedido...",
    },
  },
  en: {
    badge: "We are available",
    title: "Contact",
    description:
      "Are you an importer, distributor, or part of the HORECA sector? Tell us your needs and we will reply in less than 24 hours.",
    fullName: "Full name *",
    email: "Email *",
    country: "Country *",
    company: "Company / Organization",
    message: "Message *",
    send: "Send message",
    policy:
      "By submitting this form, you accept our privacy policy. Your data will never be shared with third parties.",
    contactInfo: "Contact information",
    emailTitle: "Email",
    phoneTitle: "Phone / WhatsApp",
    exportTitle: "We export to",
    exportTo: "EU, Asia, North and South America",
    whyChoose: "Why choose us?",
    reasons: [
      "Direct fish-market selection",
      "Certified cold chain",
      "Direct export without middlemen",
      "Complete health documentation",
      "Response in less than 24 hours",
    ],
    supportHours: "Support hours",
    weekdays: "Monday - Friday: 09:00 - 18:00 (CET)",
    saturday: "Saturday: 09:00 - 13:00 (CET)",
    placeholders: {
      name: "Your name",
      email: "you@company.com",
      country: "Spain, France, Italy...",
      company: "Your company name (optional)",
      message: "Describe the product, estimated volume, and purchase frequency...",
    },
  },
  fr: {
    badge: "Nous sommes disponibles",
    title: "Contact",
    description:
      "Vous etes importateur, distributeur ou dans le secteur HORECA? Expliquez-nous vos besoins et nous repondrons en moins de 24 heures.",
    fullName: "Nom complet *",
    email: "Email *",
    country: "Pays *",
    company: "Entreprise / Organisation",
    message: "Message *",
    send: "Envoyer le message",
    policy:
      "En envoyant ce formulaire, vous acceptez notre politique de confidentialite. Vos donnees ne seront jamais cedees a des tiers.",
    contactInfo: "Informations de contact",
    emailTitle: "Email",
    phoneTitle: "Telephone / WhatsApp",
    exportTitle: "Nous exportons vers",
    exportTo: "UE, Asie, Amerique du Nord et du Sud",
    whyChoose: "Pourquoi nous choisir?",
    reasons: [
      "Selection directe en criée",
      "Chaine du froid certifiee",
      "Export direct sans intermediaires",
      "Documentation sanitaire complete",
      "Reponse en moins de 24 heures",
    ],
    supportHours: "Heures de service",
    weekdays: "Lundi - Vendredi: 09:00 - 18:00 (CET)",
    saturday: "Samedi: 09:00 - 13:00 (CET)",
    placeholders: {
      name: "Votre nom",
      email: "vous@entreprise.com",
      country: "Espagne, France, Italie...",
      company: "Nom de votre entreprise (optionnel)",
      message: "Decrivez le produit, le volume et la frequence de commande...",
    },
  },
  ar: {
    badge: "نحن متاحون",
    title: "اتصل بنا",
    description:
      "هل انت مستورد او موزع او تعمل في قطاع الفنادق والمطاعم؟ اخبرنا باحتياجاتك وسنرد خلال اقل من 24 ساعة.",
    fullName: "الاسم الكامل *",
    email: "البريد الالكتروني *",
    country: "الدولة *",
    company: "الشركة / المؤسسة",
    message: "الرسالة *",
    send: "ارسال الرسالة",
    policy:
      "عند ارسال هذا النموذج فانك توافق على سياسة الخصوصية. لن تتم مشاركة بياناتك مع اي طرف ثالث.",
    contactInfo: "معلومات الاتصال",
    emailTitle: "البريد الالكتروني",
    phoneTitle: "الهاتف / واتساب",
    exportTitle: "نصدر الى",
    exportTo: "الاتحاد الاوروبي واسيا وامريكا الشمالية والجنوبية",
    whyChoose: "لماذا تختارنا؟",
    reasons: [
      "اختيار مباشر من سوق السمك",
      "سلسلة تبريد معتمدة",
      "تصدير مباشر دون وسطاء",
      "توثيق صحي كامل",
      "الرد خلال اقل من 24 ساعة",
    ],
    supportHours: "اوقات الخدمة",
    weekdays: "الاثنين - الجمعة: 09:00 - 18:00 (CET)",
    saturday: "السبت: 09:00 - 13:00 (CET)",
    placeholders: {
      name: "اسمك",
      email: "you@company.com",
      country: "اسبانيا، فرنسا، ايطاليا...",
      company: "اسم الشركة (اختياري)",
      message: "اكتب المنتج المطلوب والكمية التقريبية وتكرار الطلب...",
    },
  },
};

export default function ContactoClient() {
  const locale = useLocale();
  const t = copyByLocale[locale];
  const dir = getDirection(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" dir={dir}>
      <div className="text-center mb-14">
        <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
          {t.badge}
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{t.title}</h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  placeholder={t.placeholders.name}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder={t.placeholders.email}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pais" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.country}
              </label>
              <input
                type="text"
                id="pais"
                name="pais"
                required
                placeholder={t.placeholders.country}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="empresa" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.company}
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                placeholder={t.placeholders.company}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.message}
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={5}
                placeholder={t.placeholders.message}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors shadow-md"
            >
              {t.send}
            </button>

            <p className="text-xs text-gray-400 text-center">{t.policy}</p>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-950 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">{t.contactInfo}</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-300 text-lg mt-0.5">📧</span>
                <div>
                  <p className="font-semibold text-white">{t.emailTitle}</p>
                  <p>info@oceanfresh.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-300 text-lg mt-0.5">📞</span>
                <div>
                  <p className="font-semibold text-white">{t.phoneTitle}</p>
                  <p>+34 600 000 000</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-300 text-lg mt-0.5">🌍</span>
                <div>
                  <p className="font-semibold text-white">{t.exportTitle}</p>
                  <p>{t.exportTo}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.whyChoose}</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {t.reasons.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.supportHours}</h3>
            <p className="text-sm text-gray-600">{t.weekdays}</p>
            <p className="text-sm text-gray-600 mt-1">{t.saturday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
