import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookieNotice from "../components/CookieNotice";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { legalInfo } from "@/lib/legal";
import { fontVariables } from "@/lib/fonts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oceanfresh.es";

const organizationId = `${siteUrl}/#organization`;

// Schema telephone in international format. Assumes the number is Spanish (+34).
const schemaPhone = legalInfo.phone.startsWith("+")
  ? legalInfo.phone
  : `+34 ${legalInfo.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: "OceanFresh",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/logo.jpeg`,
  description:
    "Importación directa de pescado fresco y congelado desde Mauritania para distribuidores y canal HORECA.",
  email: legalInfo.email,
  telephone: schemaPhone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ilot P5, Lot 345, BP 00156",
    addressLocality: "Nouadhibou",
    addressCountry: "MR",
  },
  areaServed: ["ES", "EU", "MA", "MR"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "OceanFresh",
  url: `${siteUrl}/`,
  inLanguage: "es",
  publisher: { "@id": organizationId },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OceanFresh | Importación de Pescado desde Mauritania",
    template: "%s | OceanFresh",
  },
  description:
    "Importación directa de pescado fresco y congelado desde el Banco Pesquero de Mauritania. Cadena de frío certificada y exportación sin intermediarios.",
  keywords: [
    "importación de pescado",
    "pescado mauritania",
    "exportación pescado congelado",
    "proveedor de pescado en españa",
    "mayorista de pescado congelado",
    "comprar pescado para hostelería",
    "pescado para restauración",
    "marisco congelado mauritania",
    "distribuidor pescado horeca",
    "proveedor pescado mayorista",
    "pescado para horeca",
    "oceanfresh",
  ],
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
    title: "OceanFresh | Importación de Pescado desde Mauritania",
    description:
      "Importación directa de pescado fresco y congelado desde Mauritania con trazabilidad certificada.",
    images: [
      {
        url: "/fondo.webp",
        width: 1200,
        height: 630,
        alt: "OceanFresh - Importación de pescado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OceanFresh | Importación de Pescado desde Mauritania",
    description:
      "Importación directa de pescado fresco y congelado desde Mauritania con trazabilidad certificada.",
    images: ["/fondo.webp"],
  },
  icons: {
    icon: "/logo.ico",
    apple: "/logo.jpeg",
    shortcut: "/logo.ico",
  },
  applicationName: "OceanFresh",
  category: "food",
  authors: [{ name: "OceanFresh", url: siteUrl }],
  creator: "OceanFresh",
  publisher: "OceanFresh",
  referrer: "origin-when-cross-origin",
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
    <html lang="es" className={fontVariables} suppressHydrationWarning>
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
        <main className="pt-24">{children}</main>
        <CookieNotice />
        <SiteFooter />
      </body>
    </html>
  );
}
