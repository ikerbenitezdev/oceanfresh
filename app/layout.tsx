import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookieNotice from "../components/CookieNotice";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { legalInfo } from "@/lib/legal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oceanfresh.es";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OceanFresh",
  url: siteUrl,
  logo: `${siteUrl}/logo.jpeg`,
  description:
    "Importación directa de pescado fresco y congelado desde Mauritania para distribuidores y canal HORECA.",
  email: legalInfo.email,
  telephone: legalInfo.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: legalInfo.address,
    addressCountry: "MR",
  },
  areaServed: ["ES", "EU", "MA", "MR"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OceanFresh",
  url: siteUrl,
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/productos`,
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OceanFresh | Importación de Pescado desde Mauritania",
    template: "%s | OceanFresh",
  },
  description:
    "Importación directa de pescado fresco y congelado desde el Banco Pesquero de Mauritania. Calidad premium, cadena de frío certificada y exportación sin intermediarios.",
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
        <CookieNotice />
        <SiteFooter />
      </body>
    </html>
  );
}
