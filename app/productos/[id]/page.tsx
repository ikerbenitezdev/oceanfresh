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
        <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-50 to-blue-50 p-6">
          <Image
            src={producto.imagen_url}
            alt={producto.nombre}
            fill
            priority
            className="object-contain p-6"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {producto.categoria}
            </span>
          </div>
        </div>

        {/* Información */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
            {producto.nombre}
          </h1>
          {producto.ficha_tecnica?.nombre_cientifico && (
            <p className="text-gray-500 italic text-base mb-2">
              {producto.ficha_tecnica.nombre_cientifico}
            </p>
          )}
          <p className="text-blue-600 font-medium flex items-center gap-1 mb-6">
            <span>📍</span> {producto.origen}
          </p>

          {/* Ficha técnica */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Categoría</p>
              <p className="text-gray-800 font-semibold mt-1">{producto.categoria}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Temporada</p>
              <p className="text-gray-800 font-semibold mt-1">{producto.temporada}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Método de pesca</p>
              <p className="text-gray-800 font-semibold mt-1">Redes</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Estado</p>
              <p className="text-gray-800 font-semibold mt-1">Eviscerado y congelado</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Conservación</p>
              <p className="text-gray-800 font-semibold mt-1">
                {producto.ficha_tecnica?.temperatura_conservacion ?? "-18 °C"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Certificación</p>
              <p className="text-gray-800 font-semibold mt-1">
                <a
                  href="https://www.onispa.mr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  ONISPA
                </a>
              </p>
            </div>
            {producto.talla_minima && producto.talla_minima !== "Consultar" && (
              <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Talla / Calibre</p>
                <p className="text-gray-800 font-semibold mt-1">{producto.talla_minima}</p>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Descripción</h2>
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

      {/* Presentaciones disponibles */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Presentaciones disponibles</h2>
        <p className="text-gray-500 mb-8">
          El producto se puede suministrar en distintos formatos según las necesidades del comprador.
        </p>

        {producto.categoria === "Pescado" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                code: "Whole Round",
                label: "Entero",
                desc: "Pieza entera tal como se captura. Con cabeza, vísceras, cola, piel y espina.",
                icon: "🐟",
              },
              {
                code: "HG",
                label: "Headed & Gutted",
                desc: "Sin cabeza y sin vísceras (tripas). Mantiene cola, piel y espina central.",
                icon: "✂️",
              },
              {
                code: "HGT",
                label: "Headed, Gutted & Tailed",
                desc: "Sin cabeza, sin vísceras y sin cola. Solo mantiene piel y espina central.",
                icon: "🔪",
              },
              {
                code: "Filete",
                label: "Filete",
                desc: "Sin cabeza, sin vísceras y sin espina central. Disponible con piel o sin piel según el pedido.",
                icon: "🍽️",
              },
            ].map((p) => (
              <div key={p.code} className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col gap-2">
                <div className="text-3xl">{p.icon}</div>
                <p className="font-bold text-blue-800 text-sm tracking-wide uppercase">{p.code}</p>
                <p className="font-semibold text-gray-900 text-base">{p.label}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                code: "Entero",
                desc: "Pieza entera. Para crustáceos y cefalópodos se suministra entero limpio o crudo.",
                icon: "🦐",
              },
              {
                code: "Pelado / Cola",
                desc: "Sin caparazón. Para gambas y langostinos disponible solo cola (tail-on o tail-off).",
                icon: "🍤",
              },
              {
                code: "Limpio / Tubo",
                desc: "Para cefalópodos (calamar, sepia, pulpo): vaciado y limpio, en tubo o entero.",
                icon: "🦑",
              },
            ].map((p) => (
              <div key={p.code} className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col gap-2">
                <div className="text-3xl">{p.icon}</div>
                <p className="font-bold text-blue-800 text-sm tracking-wide uppercase">{p.code}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Envasado y Embalaje */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Envasado y Embalaje</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-3">📦</div>
            <p className="font-bold text-gray-900 mb-1">Caja de cartón aluminizado</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Interior con lámina de aluminio para mantener la cadena de frío.
              Resistente a bajas temperaturas y humedad.
            </p>
          </div>

          {producto.categoria === "Pescado" ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-3">⚖️</div>
              <p className="font-bold text-gray-900 mb-1">Formato: 10 kg / 20 kg</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Cajas de 10 kg o 20 kg neto según las necesidades del comprador.
                Formato personalizable para pedidos de gran volumen.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-3">⚖️</div>
              <p className="font-bold text-gray-900 mb-1">Formato: 2 kg / 5 kg en caja maestra de 20 kg</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unidades individuales de 2 kg o 5 kg agrupadas en una caja maestra de 20 kg neto
                para facilitar la distribución.
              </p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-3">🌡️</div>
            <p className="font-bold text-gray-900 mb-1">Cadena de frío garantizada</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Conservación a -18 °C desde la captura hasta la entrega.
              Temperatura monitorizada en cada etapa del transporte.
            </p>
          </div>
        </div>
      </div>

      {/* Muestras gratuitas */}
      <div className="mt-12 bg-blue-950 rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
        <div>
          <p className="font-bold text-lg">🎁 Muestras gratuitas disponibles</p>
          <p className="text-blue-200 text-sm mt-1">
            Ofrecemos muestras gratuitas para que puedas verificar la calidad del producto antes de realizar tu pedido.
            Contáctanos indicando el producto de interés.
          </p>
        </div>
        <Link
          href={`/contacto?producto=${encodeURIComponent(producto.nombre)}&muestra=true`}
          className="shrink-0 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Solicitar muestra →
        </Link>
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
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-3">
                <Image
                  src={rel.imagen_url}
                  alt={rel.nombre}
                  fill
                  className="object-contain p-3 transition-transform duration-300"
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
