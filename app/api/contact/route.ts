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
  const subject = `Nuevo contacto web - ${nombre} (${pais})`;

  try {
    await resend.emails.send({
      from: fromAddress,
      to: [legalInfo.email],
      replyTo: email,
      subject,
      text: [
        "Nuevo mensaje recibido desde el formulario web.",
        "",
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        `Pais: ${pais}`,
        `Empresa: ${empresa || "No indicada"}`,
        `Idioma: ${locale}`,
        "",
        "Mensaje:",
        mensaje,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin: 0 0 16px;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Pais:</strong> ${escapeHtml(pais)}</p>
          <p><strong>Empresa:</strong> ${escapeHtml(empresa || "No indicada")}</p>
          <p><strong>Idioma:</strong> ${escapeHtml(locale)}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(mensaje)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Could not send email" },
      { status: 500 },
    );
  }
}
