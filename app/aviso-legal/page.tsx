import type { Metadata } from "next";
import { legalInfo, legalPlaceholderNotice } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso legal | OceanFresh",
  description: "Informacion legal del titular del sitio, condiciones de uso y responsabilidades.",
};

export default function AvisoLegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-900">
      <h1 className="text-4xl font-extrabold">Aviso legal</h1>
      <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        {legalPlaceholderNotice}
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold">1. Identificacion del titular</h2>
          <div className="mt-4 grid gap-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-2">
            <p><span className="font-semibold">Nombre comercial:</span> {legalInfo.tradeName}</p>
            <p><span className="font-semibold">Titular:</span> {legalInfo.ownerName}</p>
            <p><span className="font-semibold">NIF/CIF:</span> {legalInfo.taxId}</p>
            <p><span className="font-semibold">Email:</span> {legalInfo.email}</p>
            <p><span className="font-semibold">Telefono:</span> {legalInfo.phone}</p>
            <p><span className="font-semibold">Registro mercantil:</span> {legalInfo.registry}</p>
            <p className="sm:col-span-2"><span className="font-semibold">Domicilio:</span> {legalInfo.address}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Objeto</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Este sitio web tiene por objeto ofrecer informacion comercial sobre productos del mar,
            exportacion, contacto con clientes profesionales y presentacion de los servicios de OceanFresh.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. Condiciones de uso</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            El acceso a esta web atribuye la condicion de usuario e implica la aceptacion de las presentes condiciones.
            El usuario se compromete a hacer un uso licito del sitio, de sus contenidos y de los formularios de contacto.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Propiedad intelectual e industrial</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Los textos, imagenes, logotipos, disenos, estructura y contenidos del sitio son titularidad del responsable
            o se utilizan con autorizacion. Queda prohibida su reproduccion, distribucion o transformacion sin permiso previo,
            salvo los usos permitidos legalmente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Responsabilidad</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            El titular no se hace responsable del mal uso del sitio por parte de terceros ni de posibles interrupciones,
            errores tecnicos o enlaces externos fuera de su control. Se adoptaran, no obstante, las medidas razonables para
            asegurar el correcto funcionamiento de la web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">6. Legislacion aplicable</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Este aviso legal se rige por la normativa aplicable en Espana y, en su caso, por la normativa europea de aplicacion.
            Para cualquier controversia, las partes se someteran a los juzgados y tribunales que correspondan conforme a derecho.
          </p>
        </section>

        <p className="text-sm text-gray-500">Ultima actualizacion: {legalInfo.lastUpdated}</p>
      </div>
    </div>
  );
}
