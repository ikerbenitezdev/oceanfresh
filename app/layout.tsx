import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oceanfresh.es";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OceanFresh",
  url: siteUrl,
  logo: `${siteUrl}/logo.jpeg`,
  description:
    "Importacion directa de pescado fresco y congelado desde Mauritania para distribuidores y canal HORECA.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OceanFresh",
  url: siteUrl,
  inLanguage: "es",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OceanFresh | Importacion de Pescado desde Mauritania",
    template: "%s | OceanFresh",
  },
  description:
    "Importacion directa de pescado fresco y congelado desde el Banco Pesquero de Mauritania. Calidad premium, cadena de frio certificada y exportacion sin intermediarios.",
  keywords: [
    "importacion de pescado",
    "pescado mauritania",
    "exportacion pescado congelado",
    "proveedor pescado mayorista",
    "pescado para horeca",
    "oceanfresh",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "OceanFresh",
    title: "OceanFresh | Importacion de Pescado desde Mauritania",
    description:
      "Importacion directa de pescado fresco y congelado desde Mauritania con trazabilidad certificada.",
    images: [
      {
        url: "/fondo.webp",
        width: 1200,
        height: 630,
        alt: "OceanFresh - Importacion de pescado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OceanFresh | Importacion de Pescado desde Mauritania",
    description:
      "Importacion directa de pescado fresco y congelado desde Mauritania con trazabilidad certificada.",
    images: ["/fondo.webp"],
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
    shortcut: "/logo.jpeg",
  },
  applicationName: "OceanFresh",
  category: "food",
  authors: [{ name: "OceanFresh", url: siteUrl }],
  creator: "OceanFresh",
  publisher: "OceanFresh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f49",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-white text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>

        <section className="mt-16 bg-slate-100 text-slate-900 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Nuestro punto de origen
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
                Puerto de Nouadhibou
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Desde este puerto estratégico en Mauritania coordinamos la recepción,
                inspección y expedición de mercancía para exportación internacional.
              </p>
              <a
                href="https://www.google.com/maps?q=Port%20de%20Nouadhibou%20Mauritania"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Ver ubicación en Google Maps
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

        <footer className="bg-gradient-to-b from-blue-950 to-blue-900 text-white pt-14 pb-8">
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
                <p className="text-sm text-blue-100/90 mt-4 leading-relaxed">
                  Importación directa de pescado y marisco desde Mauritania,
                  con cadena de frío certificada y trazabilidad completa.
                </p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-blue-200 font-semibold mb-4">
                  Navegación
                </h3>
                <div className="space-y-2 text-sm">
                  <Link href="/" className="block hover:text-blue-300 transition-colors">Inicio</Link>
                  <Link href="/productos" className="block hover:text-blue-300 transition-colors">Catálogo</Link>
                  <Link href="/#quienes-somos" className="block hover:text-blue-300 transition-colors">Quiénes Somos</Link>
                  <Link href="/contacto" className="block hover:text-blue-300 transition-colors">Contacto</Link>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-blue-200 font-semibold mb-4">
                  Exportación
                </h3>
                <div className="space-y-2 text-sm text-blue-100/90">
                  <p>Certificación sanitaria ONISPA</p>
                  <p>Documentación para mercado europeo</p>
                  <p>Trazabilidad desde origen</p>
                  <p>Formatos según necesidad del cliente</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-blue-200 font-semibold mb-4">
                  ¿Hablamos?
                </h3>
                <p className="text-sm text-blue-100/90 mb-4">
                  Solicita catálogo actualizado, disponibilidad y condiciones de envío.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Solicitar información
                </Link>
              </div>
            </div>

            <div className="border-t border-blue-800 mt-10 pt-6 text-center text-xs text-blue-200/90">
              © {new Date().getFullYear()} OceanFresh. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
