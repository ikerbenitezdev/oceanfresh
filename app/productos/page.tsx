import type { Metadata } from "next";
import CatalogoClient from "@/components/CatalogoClient";
import productos from "@/data/productos.json";

export const metadata: Metadata = {
  title: "Catálogo de Productos | OceanFresh",
  description:
    "Explora nuestro catálogo de pescado fresco y congelado procedente del Banco Pesquero de Mauritania.",
  keywords: [
    "catálogo de pescado",
    "pescado congelado mauritania",
    "marisco para importación",
    "proveedor de pescado mayorista",
  ],
  alternates: {
    canonical: "/productos",
  },
  openGraph: {
    title: "Catálogo de Productos | OceanFresh",
    description:
      "Catálogo actualizado de pescado y marisco para importadores, distribuidores y canal HORECA.",
    url: "/productos",
    images: [
      {
        url: "/fondo2.webp",
        width: 1200,
        height: 630,
        alt: "Catálogo de productos OceanFresh",
      },
    ],
  },
};

export default function CatalogoPage() {
  return <CatalogoClient productos={productos} />;
}
