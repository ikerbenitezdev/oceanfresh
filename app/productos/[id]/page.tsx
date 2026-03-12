import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import productos from "@/data/productos.json";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return productos.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const producto = productos.find((p) => p.id === id);
  if (!producto) return {};
  return {
    title: `${producto.nombre} | OceanFresh`,
    description: producto.descripcion.slice(0, 160),
  };
}

export default async function ProductoDetalle({ params }: Props) {
  const { id } = await params;
  const producto = productos.find((p) => p.id === id);

  if (!producto) notFound();

  const relacionados = productos.filter((p) => p.id !== producto.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-blue-600 transition-colors">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{producto.nombre}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Imagen */}
        <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={producto.imagen_url}
            alt={producto.nombre}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {producto.categoria}
            </span>
          </div>
        </div>

        {/* Información */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {producto.nombre}
          </h1>
          <p className="text-blue-600 font-medium flex items-center gap-1 mb-6">
            <span>📍</span> {producto.origen}
          </p>

          {/* Ficha técnica */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                Categoría
              </p>
              <p className="text-gray-800 font-semibold mt-1">{producto.categoria}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                Talla mínima
              </p>
              <p className="text-gray-800 font-semibold mt-1">{producto.talla_minima}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 col-span-2">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                Temporada
              </p>
              <p className="text-gray-800 font-semibold mt-1">{producto.temporada}</p>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Descripción técnica
            </h2>
            <p className="text-gray-600 leading-relaxed">{producto.descripcion}</p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/contacto?producto=${encodeURIComponent(producto.nombre)}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-center text-lg transition-colors shadow-md"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="/productos"
              className="flex-1 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-4 px-6 rounded-xl text-center text-lg transition-colors"
            >
              ← Ver catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Otros productos disponibles
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {relacionados.map((rel) => (
            <Link
              key={rel.id}
              href={`/productos/${rel.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={rel.imagen_url}
                  alt={rel.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-blue-600 font-semibold uppercase">
                  {rel.categoria}
                </span>
                <h3 className="font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                  {rel.nombre}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
