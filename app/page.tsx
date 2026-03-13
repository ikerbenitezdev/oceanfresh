"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import productos from "@/data/productos.json";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Home() {
  const preview = productos.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/fondo.webp"
          alt="Pesca artesanal en Mauritania"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-950/50" />
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.span
            className="inline-block bg-blue-500/20 border border-blue-400/40 text-blue-200 text-sm font-medium px-4 py-1 rounded-full mb-6 tracking-wide uppercase"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Importación directa • Banco Pesquero de Mauritania
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Exportamos calidad, desde las aguas de{" "}
            <span className="text-blue-300">Mauritania al mundo</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Pescado fresco y congelado de alta calidad procedente directamente
            del caladero más rico del océano Atlántico.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link
              href="/productos"
              className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors backdrop-blur-sm"
            >
              🪪 Obtener Licencia
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "+65", label: "Especies disponibles" },
            { value: "48h", label: "Del mar a la lonja" },
            { value: "100%", label: "Trazabilidad certificada" },
            { value: "+20", label: "Países de exportación" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <p className="text-3xl font-extrabold text-blue-300">{stat.value}</p>
              <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              Garantías de calidad
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Certificado y Trazable
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              Todo nuestro pescado es inspeccionado y certificado por{" "}
              <a
                href="https://www.onispa.mr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                ONISPA
              </a>{" "}
              (Office National d&apos;Inspection Sanitaire des Produits de la Pêche et de l&apos;Aquaculture),
              el organismo oficial de Mauritania responsable del control
              sanitario de los productos pesqueros.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🇪🇺",
                title: "Válido para exportación a Europa",
                desc: "Nuestros certificados sanitarios cumplen con los requisitos del Reglamento (CE) 854/2004 y son reconocidos por la Unión Europea para la importación de productos pesqueros.",
              },
              {
                icon: "🔍",
                title: "Inspección en origen — ONISPA",
                desc: "Cada lote es inspeccionado físicamente en lonja por veterinarios oficiales de ONISPA antes de ser autorizado para exportación. Sin inspección, no hay embarque.",
              },
              {
                icon: "📦",
                title: "Trazabilidad del mar a la exportación",
                desc: "Registramos cada etapa: barco de captura, zona FAO, fecha de pesca, procesado, temperatura de la cadena de frío y número de lote — documentación completa disponible por envío.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-8 flex flex-col gap-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 bg-blue-900 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-white"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <p className="font-bold text-lg">¿Necesitas los certificados para tu importación?</p>
              <p className="text-blue-200 text-sm mt-1">
                Te enviamos el certificado ONISPA, EUR.1, declaración de orígen y ficha HACCP con cada pedido.
              </p>
            </div>
            <a
              href="/contacto"
              className="shrink-0 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Solicitar documentación →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section id="quienes-somos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              Nuestra empresa
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Quiénes Somos
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-80 md:h-full min-h-80 rounded-2xl overflow-hidden shadow-xl"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src="/puerto.webp"
                alt="Puerto de pesca en Mauritania"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="space-y-8"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
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
                  ].map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-2"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                    >
                      <span className="text-blue-500 mt-1 shrink-0">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contacto"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contacta con nosotros
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preview productos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
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
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {preview.map((producto, i) => (
              <motion.div
                key={producto.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/productos/${producto.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 block"
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-4">
                    <Image
                      src={producto.imagen_url}
                      alt={producto.nombre}
                      fill
                      className="object-contain p-4 transition-transform duration-300"
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
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/productos"
              className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Ver catálogo completo →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
