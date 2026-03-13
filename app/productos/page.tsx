import CatalogoClient from "@/components/CatalogoClient";
import productos from "@/data/productos.json";

export const metadata = {
  title: "Catálogo de Productos | OceanFresh",
  description:
    "Explora nuestro catálogo de pescado fresco y congelado procedente del Banco Pesquero de Mauritania.",
};

export default function CatalogoPage() {
  return <CatalogoClient productos={productos} />;
}
