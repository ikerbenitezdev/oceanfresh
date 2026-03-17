import { NextResponse } from "next/server";
import { Resend } from "resend";
import { legalInfo } from "@/lib/legal";

type ContactPayload = {
  nombre?: string;
  email?: string;
  pais?: string;
  empresa?: string;
  mensaje?: string;
  locale?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Resend API key is missing" },
      { status: 500 },
    );
  }

  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const nombre = sanitize(body.nombre);
  const email = sanitize(body.email);
  const pais = sanitize(body.pais);
  const empresa = sanitize(body.empresa);
  const mensaje = sanitize(body.mensaje);
  const locale = sanitize(body.locale) || "es";

  if (!nombre || !email || !pais || !mensaje) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env.RESEND_FROM ?? "OceanFresh <onboarding@resend.dev>";
  const toAddress = process.env.RESEND_TO ?? legalInfo.email;
  const subject = `Nuevo contacto 💻 | OceanFresh | ${nombre}`;
  const submittedAt = new Date().toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safeNombre = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);
  const safePais = escapeHtml(pais);
  const safeEmpresa = escapeHtml(empresa || "No indicada");
  const safeLocale = escapeHtml(locale);
  const safeMensaje = escapeHtml(mensaje);

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject,
      text: [
        "NUEVO CONTACTO - OCEANFRESH",
        "====================================",
        "",
        `Fecha: ${submittedAt}`,
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        `País: ${pais}`,
        `Empresa: ${empresa || "No indicada"}`,
        `Idioma: ${locale}`,
        "",
        "MENSAJE DEL CLIENTE",
        "-------------------",
        mensaje,
        "",
        "Acción sugerida: responde directamente a este correo para contactar con el cliente.",
      ].join("\n"),
      html: `
        <div style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,sans-serif;color:#0f172a;line-height:1.5;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px;background:#0f3d8a;color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">OceanFresh</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">Nuevo contacto desde la web</h1>
                <p style="margin:8px 0 0;font-size:13px;opacity:.9;">Recibido el ${submittedAt}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;">
                <h2 style="margin:0 0 12px;font-size:16px;color:#0f172a;">Datos del cliente</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                  <tr>
                    <td style="width:34%;padding:10px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:700;">Nombre</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${safeNombre}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:10px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:700;">Email</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:10px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:700;">País</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${safePais}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:10px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:700;">Empresa</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${safeEmpresa}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:10px 12px;background:#f8fafc;font-weight:700;">Idioma</td>
                    <td style="padding:10px 12px;">${safeLocale}</td>
                  </tr>
                </table>

                <h2 style="margin:22px 0 10px;font-size:16px;color:#0f172a;">Mensaje</h2>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 12px;white-space:pre-wrap;">${safeMensaje}</div>

                <p style="margin:18px 0 0;font-size:13px;color:#334155;">
                  Acción sugerida: responde directamente a este correo para contactar con el cliente.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: error.message ?? "Could not send email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Could not send email" },
      { status: 500 },
    );
  }
}
