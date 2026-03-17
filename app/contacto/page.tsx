import { Metadata } from "next";
import ContactoClient from "@/components/ContactoClient";

export const metadata: Metadata = {
  title: "Contacto | OceanFresh",
  description:
    "Solicita información sobre nuestros productos o una cotización personalizada. Equipo disponible para importadores, distribuidores y grandes superficies.",
  keywords: [
    "contacto importación pescado",
    "cotización pescado congelado",
    "proveedor pescado mauritania",
    "comprar pescado mayorista",
  ],
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: "Contacto OceanFresh | Importación de pescado",
    description:
      "Habla con nuestro equipo comercial para cotizaciones, fichas técnicas y documentación de exportación.",
    url: "/contacto",
    images: [
      {
        url: "/fondo.webp",
        width: 1200,
        height: 630,
        alt: "Contacto OceanFresh",
      },
    ],
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}
