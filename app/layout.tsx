import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

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
        <SiteFooter />
      </body>
    </html>
  );
}
