import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <body className="antialiased bg-white text-gray-900">
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
        <footer className="bg-blue-950 text-gray-400 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-xl font-bold text-white">
                  Ocean<span className="text-blue-300">Fresh</span>
                </span>
                <p className="text-sm mt-1">Importación directa desde Mauritania</p>
              </div>
              <div className="flex gap-8 text-sm">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                <Link href="/productos" className="hover:text-white transition-colors">Catalogo</Link>
                <Link href="/#quienes-somos" className="hover:text-white transition-colors">Quienes Somos</Link>
                <Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link>
              </div>
            </div>
            <div className="border-t border-blue-900 mt-8 pt-6 text-center text-xs">
              © {new Date().getFullYear()} OceanFresh. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
