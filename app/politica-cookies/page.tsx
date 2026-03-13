import type { Metadata } from "next";
import { legalInfo, legalPlaceholderNotice } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politica de cookies | OceanFresh",
  description: "Informacion sobre las cookies tecnicas y de preferencia utilizadas por el sitio web.",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-900">
      <h1 className="text-4xl font-extrabold">Politica de cookies</h1>
      <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        {legalPlaceholderNotice}
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold">1. Que son las cookies</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Las cookies son pequenos archivos que el sitio web almacena en tu dispositivo para recordar informacion sobre tu visita,
            como preferencias o ajustes tecnicos necesarios para el funcionamiento de la web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Cookies utilizadas actualmente</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nombre</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Finalidad</th>
                  <th className="px-4 py-3 font-semibold">Duracion</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3">locale</td>
                  <td className="px-4 py-3">Preferencia</td>
                  <td className="px-4 py-3">Recordar el idioma seleccionado por el usuario.</td>
                  <td className="px-4 py-3">12 meses</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3">cookie_notice_closed</td>
                  <td className="px-4 py-3">Tecnica</td>
                  <td className="px-4 py-3">Recordar que el usuario ya ha visto el aviso informativo de cookies.</td>
                  <td className="px-4 py-3">12 meses</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. Cookies analiticas o publicitarias</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            En este momento, la web no utiliza cookies analiticas, publicitarias ni de perfiles de terceros. Si en el futuro se incorporan herramientas como Google Analytics, Meta Pixel u otras cookies no esenciales, se implementara un sistema de consentimiento previo antes de activarlas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Como desactivar o eliminar cookies</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que, si desactivas cookies tecnicas o de preferencia, algunas funciones del sitio pueden no comportarse como se espera.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Responsable</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            El responsable de esta web y de las cookies indicadas es {legalInfo.ownerName}, con email de contacto {legalInfo.email}.
          </p>
        </section>

        <p className="text-sm text-gray-500">Ultima actualizacion: {legalInfo.lastUpdated}</p>
      </div>
    </div>
  );
}
