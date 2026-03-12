import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | OceanFresh",
  description:
    "Solicita información sobre nuestros productos o una cotización personalizada. Equipo disponible para importadores, distribuidores y grandes superficies.",
};

export default function ContactoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
          Estamos disponibles
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
          Contacto
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
          ¿Eres importador, distribuidor o trabajas en el sector HORECA?
          Cuéntanos tus necesidades y te respondemos en menos de 24 horas.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <form className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  placeholder="Tu nombre"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="tu@empresa.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pais"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                País *
              </label>
              <input
                type="text"
                id="pais"
                name="pais"
                required
                placeholder="España, Francia, Italia..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="empresa"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Empresa / Organización
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                placeholder="Nombre de tu empresa (opcional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={5}
                placeholder="Describe qué producto te interesa, volumen aproximado, frecuencia de pedido..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors shadow-md"
            >
              Enviar mensaje
            </button>

            <p className="text-xs text-gray-400 text-center">
              Al enviar este formulario, aceptas nuestra política de privacidad.
              Tus datos nunca serán cedidos a terceros.
            </p>
          </form>
        </div>

        {/* Info de contacto */}
        <div className="space-y-6">
          <div className="bg-blue-950 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Información de contacto</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-300 text-lg mt-0.5">📧</span>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p>info@oceanfresh.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-300 text-lg mt-0.5">📞</span>
                <div>
                  <p className="font-semibold text-white">Teléfono / WhatsApp</p>
                  <p>+34 600 000 000</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-300 text-lg mt-0.5">🌍</span>
                <div>
                  <p className="font-semibold text-white">Exportamos a</p>
                  <p>UE, Asia, América del Norte y del Sur</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Selección en lonja directamente",
                "Cadena de frío certificada",
                "Exportación directa sin intermediarios",
                "Documentación sanitaria completa",
                "Respuesta en menos de 24 horas",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Horario de atención
            </h3>
            <p className="text-sm text-gray-600">
              Lunes – Viernes: 09:00 – 18:00 (CET)
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Sábados: 09:00 – 13:00 (CET)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
