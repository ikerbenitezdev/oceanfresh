import Image from "next/image";
import Link from "next/link";
import productos from "@/data/productos.json";

export const metadata = {
  title: "Catálogo de Productos | OceanFresh",
  description:
    "Explora nuestro catálogo de pescado fresco y congelado procedente del Banco Pesquero de Mauritania.",
};

export default function CatalogoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
          Importación directa
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
          Catálogo de Productos
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          Todas nuestras especies son seleccionadas en lonja, procesadas en
          frío y certificadas para exportación. Disponibilidad y calibres a
          consultar.
        </p>
      </div>

      {/* Filters / categories summary */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {["Todos", "Pescado Blanco", "Pescado Azul", "Cefalópodos", "Crustáceos"].map(
          (cat) => (
            <span
              key={cat}
              className="bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full"
            >
              {cat}
            </span>
          )
        )}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productos.map((producto) => (
          <Link
            key={producto.id}
            href={`/productos/${producto.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={producto.imagen_url}
                alt={producto.nombre}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {producto.categoria}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {producto.nombre}
              </h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <span>📍</span> {producto.origen}
              </p>
              <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                {producto.descripcion}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  <span className="font-medium text-gray-600">Temporada:</span>{" "}
                  {producto.temporada}
                </div>
                <span className="text-blue-600 text-sm font-semibold group-hover:underline">
                  Ver ficha →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-blue-950 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="text-gray-300 mb-6">
          Trabajamos con más de 15 especies. Contáctanos y te enviaremos la
          lista completa con disponibilidad y precios.
        </p>
        <Link
          href="/contacto"
          className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Solicitar información
        </Link>
      </div>
    </div>
  );
}
