import type { Metadata } from "next";
import { legalInfo, legalPlaceholderNotice } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politica de privacidad | OceanFresh",
  description: "Informacion sobre el tratamiento de datos personales en el sitio web.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-900">
      <h1 className="text-4xl font-extrabold">Politica de privacidad</h1>
      <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        {legalPlaceholderNotice}
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold">1. Responsable del tratamiento</h2>
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-2">
            <p><span className="font-semibold">Titular:</span> {legalInfo.ownerName}</p>
            <p><span className="font-semibold">Nombre comercial:</span> {legalInfo.tradeName}</p>
            <p><span className="font-semibold">Direccion:</span> {legalInfo.address}</p>
            <p><span className="font-semibold">Email de contacto:</span> {legalInfo.email}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Datos que se recogen</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            A traves del formulario de contacto pueden recogerse los siguientes datos: nombre, direccion de correo electronico,
            pais, empresa y contenido del mensaje enviado por el usuario.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. Finalidades del tratamiento</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>Responder a solicitudes de informacion, muestras, cotizaciones o contacto comercial.</li>
            <li>Gestionar comunicaciones con clientes, distribuidores o potenciales importadores.</li>
            <li>Cumplir con obligaciones legales aplicables.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Base juridica</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            La base juridica del tratamiento es el consentimiento del interesado al enviar el formulario y, en su caso,
            la aplicacion de medidas precontractuales a peticion del propio usuario.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Conservacion de los datos</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Los datos se conservaran durante el tiempo necesario para atender la consulta y, posteriormente,
            durante los plazos legales exigibles o mientras puedan derivarse responsabilidades.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">6. Destinatarios</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Con caracter general, los datos no se cederan a terceros salvo obligacion legal. Si en el futuro se utilizan
            proveedores externos de correo, hosting o CRM, se suscribiran los contratos de encargo de tratamiento correspondientes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">7. Derechos del usuario</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            El usuario puede ejercer sus derechos de acceso, rectificacion, supresion, oposicion, limitacion y portabilidad
            dirigiendose al correo {legalInfo.email}. Tambien puede presentar una reclamacion ante la Agencia Espanola de Proteccion de Datos si considera que su derecho a la proteccion de datos ha sido vulnerado.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">8. Seguridad</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Se adoptaran medidas tecnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados,
            perdida, alteracion o divulgacion indebida.
          </p>
        </section>

        <p className="text-sm text-gray-500">Ultima actualizacion: {legalInfo.lastUpdated}</p>
      </div>
    </div>
  );
}
