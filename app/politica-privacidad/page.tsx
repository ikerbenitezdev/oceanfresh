import type { Metadata } from "next";
import { legalInfo, legalPlaceholderNotice } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad | OceanFresh",
  description: "Información sobre el tratamiento de datos personales en el sitio web.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-900">
      <h1 className="text-4xl font-extrabold">Política de privacidad</h1>
      <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        {legalPlaceholderNotice}
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-2xl font-bold">1. Responsable del tratamiento</h2>
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-2">
            <p><span className="font-semibold">Titular:</span> {legalInfo.ownerName}</p>
            <p><span className="font-semibold">Nombre comercial:</span> {legalInfo.tradeName}</p>
            <p><span className="font-semibold">Dirección:</span> {legalInfo.address}</p>
            <p><span className="font-semibold">Email de contacto:</span> {legalInfo.email}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Datos que se recogen</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            A través del formulario de contacto pueden recogerse los siguientes datos: nombre, dirección de correo electrónico,
            país, empresa y contenido del mensaje enviado por el usuario.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. Finalidades del tratamiento</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>Responder a solicitudes de información, muestras, cotizaciones o contacto comercial.</li>
            <li>Gestionar comunicaciones con clientes, distribuidores o potenciales importadores.</li>
            <li>Cumplir con obligaciones legales aplicables.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Base jurídica</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            La base jurídica del tratamiento es el consentimiento del interesado al enviar el formulario y, en su caso,
            la aplicación de medidas precontractuales a petición del propio usuario.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Conservación de los datos</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Los datos se conservarán durante el tiempo necesario para atender la consulta y, posteriormente,
            durante los plazos legales exigibles o mientras puedan derivarse responsabilidades.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">6. Destinatarios</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Con carácter general, los datos no se cederán a terceros salvo obligación legal. Si en el futuro se utilizan
            proveedores externos de correo, hosting o CRM, se suscribirán los contratos de encargo de tratamiento correspondientes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">7. Derechos del usuario</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
            dirigiéndose al correo {legalInfo.email}. También puede presentar una reclamación ante la Agencia Española de Protección de Datos si considera que su derecho a la protección de datos ha sido vulnerado.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">8. Seguridad</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Se adoptarán medidas técnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados,
            pérdida, alteración o divulgación indebida.
          </p>
        </section>

        <p className="text-sm text-gray-500">Última actualización: {legalInfo.lastUpdated}</p>
      </div>
    </div>
  );
}
