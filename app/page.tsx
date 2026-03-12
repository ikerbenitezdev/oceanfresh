import Image from "next/image";
import Link from "next/link";
import productos from "@/data/productos.json";

export default function Home() {
  const preview = productos.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop"
          alt="Pesca artesanal en Mauritania"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-950/65" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <span className="inline-block bg-blue-500/20 border border-blue-400/40 text-blue-200 text-sm font-medium px-4 py-1 rounded-full mb-6 tracking-wide uppercase">
            Importación directa • Banco Pesquero de Mauritania
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Del Atlántico a tu Mesa,{" "}
            <span className="text-blue-300">sin Intermediarios</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Pescado fresco y congelado de alta calidad procedente directamente
            del caladero más rico del océano Atlántico.
          </p>
          <Link
            href="/productos"
            className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "+15", label: "Especies disponibles" },
            { value: "48h", label: "Del mar a la lonja" },
            { value: "100%", label: "Trazabilidad certificada" },
            { value: "+20", label: "Países de exportación" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-blue-300">{stat.value}</p>
              <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiénes Somos */}
      <section id="quienes-somos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              Nuestra empresa
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Quiénes Somos
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-full min-h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=900&auto=format&fit=crop"
                alt="Puerto de pesca en Mauritania"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-8">
              {/* Misión */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                    🎯
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Nuestra Misión</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Conectar la riqueza del banco pesquero de Mauritania —uno de
                  los más abundantes del mundo— con los mercados internacionales,
                  garantizando frescura y sostenibilidad desde el origen hasta el
                  destino.
                </p>
              </div>

              {/* Diferencial */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                    ⭐
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Nuestro Valor Diferencial</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  {[
                    "Selección en lonja directamente en el punto de descarga.",
                    "Cadena de frío certificada de +2ºC a -18ºC desde el barco.",
                    "Exportación directa sin intermediarios innecesarios.",
                    "Documentación HACCP, EUR1 y certificados sanitarios incluidos.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contacto"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contacta con nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Preview productos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              Lo más solicitado
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Nuestro Catálogo
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Especies seleccionadas directamente en los puertos mauritanos con
              la máxima frescura y control de calidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {preview.map((producto) => (
              <Link
                key={producto.id}
                href={`/productos/${producto.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {producto.categoria}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                    {producto.nombre}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">📍 {producto.origen}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/productos"
              className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Ver catálogo completo →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
