import { NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFImage,
  type PDFPage,
} from "pdf-lib";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import productos from "@/data/productos.json";
import { legalInfo } from "@/lib/legal";

export const runtime = "nodejs";

type CatalogProduct = {
  id: string;
  nombre: string;
  categoria?: string;
  origen?: string;
  descripcion?: string;
  descripcion_larga?: string;
  imagen_url?: string;
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const BODY_COLOR = rgb(0.1, 0.13, 0.16);
const MUTED_COLOR = rgb(0.35, 0.39, 0.45);
const BRAND_COLOR = rgb(0.06, 0.24, 0.54);
const SUPPORT_EXTENSIONS = new Set([".jpg", ".jpeg", ".jpe", ".png", ".webp"]);

type RgbColor = ReturnType<typeof rgb>;

function toPublicPath(...segments: string[]): string {
  return path.join(process.cwd(), "public", ...segments);
}

function toPdfSafeText(value: string): string {
  return value
    .replace(/\u2212/g, "-")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/\u2026/g, "...")
    .replace(/[^\u0009\u000A\u000D\u0020-\u00FF]/g, "");
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function sanitizeUrlPath(relativeUrl: string): string {
  const withoutQuery = relativeUrl.split("?")[0] ?? "";
  return withoutQuery.replace(/^\/+/, "");
}

function isRemoteImageUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

async function resolveProductImagePath(relativeUrl?: string): Promise<string | null> {
  if (!relativeUrl) {
    return null;
  }

  if (isRemoteImageUrl(relativeUrl)) {
    const remotePathname = new URL(relativeUrl).pathname;
    const remoteExt = path.extname(remotePathname).toLowerCase();
    return SUPPORT_EXTENSIONS.has(remoteExt) ? relativeUrl : null;
  }

  const cleanRelativePath = sanitizeUrlPath(relativeUrl);
  if (!cleanRelativePath) {
    return null;
  }

  const absolutePath = toPublicPath(cleanRelativePath);
  const extension = path.extname(absolutePath).toLowerCase();

  if (SUPPORT_EXTENSIONS.has(extension) && (await fileExists(absolutePath))) {
    return absolutePath;
  }

  const imageDirectory = path.dirname(absolutePath);
  const baseName = path.basename(absolutePath, path.extname(absolutePath));

  try {
    const files = await readdir(imageDirectory);
    const fallback = files
      .filter((fileName) => {
        const fileExtension = path.extname(fileName).toLowerCase();
        return SUPPORT_EXTENSIONS.has(fileExtension) && fileName.toLowerCase().startsWith(baseName.toLowerCase());
      })
      .sort((a, b) => a.length - b.length)[0];

    return fallback ? path.join(imageDirectory, fallback) : null;
  } catch {
    return null;
  }
}

async function embedImage(
  pdfDoc: PDFDocument,
  imagePath: string,
  cache: Map<string, PDFImage>,
): Promise<PDFImage | null> {
  const fromCache = cache.get(imagePath);
  if (fromCache) {
    return fromCache;
  }

  try {
    const isRemote = isRemoteImageUrl(imagePath);
    const extension = isRemote
      ? path.extname(new URL(imagePath).pathname).toLowerCase()
      : path.extname(imagePath).toLowerCase();
    const bytes = isRemote
      ? Buffer.from(await (await fetch(imagePath, { cache: "no-store" })).arrayBuffer())
      : await readFile(imagePath);
    let image: PDFImage | null = null;

    if (extension === ".png") {
      image = await pdfDoc.embedPng(bytes);
    } else if (extension === ".jpg" || extension === ".jpeg" || extension === ".jpe") {
      image = await pdfDoc.embedJpg(bytes);
    } else if (extension === ".webp") {
      const pngBuffer = await sharp(bytes).png().toBuffer();
      image = await pdfDoc.embedPng(pngBuffer);
    }

    if (!image) {
      return null;
    }

    cache.set(imagePath, image);
    return image;
  } catch {
    return null;
  }
}

function fitInside(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  const ratio = Math.min(maxWidth / width, maxHeight / height);
  return {
    width: width * ratio,
    height: height * ratio,
  };
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const normalized = toPdfSafeText(text).replace(/\s+/g, " ").trim();
  if (!normalized) {
    return [];
  }

  const words = normalized.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    const candidateWidth = font.widthOfTextAtSize(candidate, size);

    if (candidateWidth <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
      continue;
    }

    let chunk = "";
    for (const char of word) {
      const chunkCandidate = `${chunk}${char}`;
      if (font.widthOfTextAtSize(chunkCandidate, size) <= maxWidth) {
        chunk = chunkCandidate;
      } else {
        if (chunk) {
          lines.push(chunk);
        }
        chunk = char;
      }
    }
    currentLine = chunk;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function addNewPage(pdfDoc: PDFDocument): PDFPage {
  return pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
}

async function buildCatalogPdf(): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const imageCache = new Map<string, PDFImage>();

  const coverPage = addNewPage(pdfDoc);

  coverPage.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: rgb(0.96, 0.98, 1),
  });
  coverPage.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 290,
    width: PAGE_WIDTH,
    height: 290,
    color: BRAND_COLOR,
  });

  const logoPath = toPublicPath("logo.jpeg");
  if (await fileExists(logoPath)) {
    const logoImage = await embedImage(pdfDoc, logoPath, imageCache);
    if (logoImage) {
      const fittedLogo = fitInside(logoImage.width, logoImage.height, 180, 180);
      coverPage.drawImage(logoImage, {
        x: (PAGE_WIDTH - fittedLogo.width) / 2,
        y: PAGE_HEIGHT - 255,
        width: fittedLogo.width,
        height: fittedLogo.height,
      });
    }
  }

  coverPage.drawText("CATALOGO CORPORATIVO", {
    x: MARGIN,
    y: PAGE_HEIGHT - 340,
    size: 16,
    font: bold,
    color: BRAND_COLOR,
  });
  coverPage.drawText("OceanFresh", {
    x: MARGIN,
    y: PAGE_HEIGHT - 382,
    size: 34,
    font: bold,
    color: BRAND_COLOR,
  });

  const coverText = toPdfSafeText(
    "Importacion y exportacion de pescado y marisco congelado desde Mauritania, con trazabilidad, cadena de frio certificada y enfoque B2B para distribuidores y canal HORECA.",
  );
  const coverLines = wrapText(coverText, regular, 12, PAGE_WIDTH - MARGIN * 2);
  let coverY = PAGE_HEIGHT - 415;
  for (const line of coverLines) {
    coverPage.drawText(line, {
      x: MARGIN,
      y: coverY,
      size: 12,
      font: regular,
      color: BODY_COLOR,
    });
    coverY -= 17;
  }

  const contactBoxY = 130;
  coverPage.drawRectangle({
    x: MARGIN,
    y: contactBoxY,
    width: PAGE_WIDTH - MARGIN * 2,
    height: 150,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.84, 0.89, 0.97),
    borderWidth: 1,
  });
  coverPage.drawText("Datos de contacto", {
    x: MARGIN + 14,
    y: contactBoxY + 122,
    size: 12,
    font: bold,
    color: BRAND_COLOR,
  });

  const coverContactLines = [
    `Email: ${legalInfo.email}`,
    `Telefono: ${legalInfo.phone}`,
    `Direccion: ${legalInfo.address}`,
    `Registro: ${legalInfo.registry}`,
  ];

  let contactY = contactBoxY + 100;
  for (const line of coverContactLines) {
    const safeLine = toPdfSafeText(line);
    const lines = wrapText(safeLine, regular, 10, PAGE_WIDTH - MARGIN * 2 - 28);
    for (const wrappedLine of lines) {
      coverPage.drawText(wrappedLine, {
        x: MARGIN + 14,
        y: contactY,
        size: 10,
        font: regular,
        color: MUTED_COLOR,
      });
      contactY -= 14;
    }
  }

  const editionDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  coverPage.drawText(`Edicion: ${toPdfSafeText(editionDate)}`, {
    x: MARGIN,
    y: 70,
    size: 10,
    font: regular,
    color: MUTED_COLOR,
  });

  let page = addNewPage(pdfDoc);
  let y = PAGE_HEIGHT - MARGIN;

  const drawPageTitle = () => {
    page.drawText("Catalogo de productos", {
      x: MARGIN,
      y,
      size: 18,
      font: bold,
      color: BRAND_COLOR,
    });
    y -= 28;
  };

  drawPageTitle();

  const ensureSpace = (requiredHeight: number) => {
    if (y - requiredHeight < MARGIN) {
      page = addNewPage(pdfDoc);
      y = PAGE_HEIGHT - MARGIN;
      drawPageTitle();
    }
  };

  const productosOrdenados = [...(productos as CatalogProduct[])].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es"),
  );

  for (const [index, producto] of productosOrdenados.entries()) {
    const descripcionBase =
      producto.descripcion_larga?.trim() || producto.descripcion?.trim() || "Descripcion no disponible.";
    const descripcionPreview =
      descripcionBase.length > 420 ? `${descripcionBase.slice(0, 420).trim()}...` : descripcionBase;

    const imagePath = await resolveProductImagePath(producto.imagen_url);
    const image = imagePath ? await embedImage(pdfDoc, imagePath, imageCache) : null;

    const cardX = MARGIN;
    const cardWidth = PAGE_WIDTH - MARGIN * 2;
    const imageBoxWidth = 142;
    const imageBoxHeight = 104;
    const textX = cardX + imageBoxWidth + 18;
    const textWidth = cardWidth - imageBoxWidth - 30;

    const descriptionLines = wrapText(descripcionPreview, regular, 10, textWidth);
    const descriptionLineCount = Math.min(descriptionLines.length, 8);
    const cardHeight = Math.max(154, 86 + descriptionLineCount * 13);

    ensureSpace(cardHeight + 16);

    const cardY = y - cardHeight;
    page.drawRectangle({
      x: cardX,
      y: cardY,
      width: cardWidth,
      height: cardHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.87, 0.91, 0.97),
      borderWidth: 1,
    });

    const imageAreaX = cardX + 12;
    const imageAreaY = cardY + cardHeight - imageBoxHeight - 16;

    page.drawRectangle({
      x: imageAreaX,
      y: imageAreaY,
      width: imageBoxWidth,
      height: imageBoxHeight,
      color: rgb(0.95, 0.97, 1),
      borderColor: rgb(0.9, 0.93, 0.98),
      borderWidth: 1,
    });

    if (image) {
      const fitted = fitInside(image.width, image.height, imageBoxWidth - 12, imageBoxHeight - 12);
      page.drawImage(image, {
        x: imageAreaX + (imageBoxWidth - fitted.width) / 2,
        y: imageAreaY + (imageBoxHeight - fitted.height) / 2,
        width: fitted.width,
        height: fitted.height,
      });
    } else {
      page.drawText("Imagen no disponible", {
        x: imageAreaX + 16,
        y: imageAreaY + imageBoxHeight / 2 - 5,
        size: 9,
        font: regular,
        color: MUTED_COLOR,
      });
    }

    let textY = cardY + cardHeight - 24;
    const titleLines = wrapText(`${index + 1}. ${producto.nombre}`, bold, 12, textWidth).slice(0, 2);
    for (const titleLine of titleLines) {
      page.drawText(titleLine, {
        x: textX,
        y: textY,
        size: 12,
        font: bold,
        color: BRAND_COLOR,
      });
      textY -= 14;
    }

    textY -= 4;
    page.drawText(toPdfSafeText(`Categoria: ${producto.categoria ?? "No especificada"}`), {
      x: textX,
      y: textY,
      size: 9.5,
      font: regular,
      color: MUTED_COLOR,
    });

    textY -= 14;
    page.drawText(toPdfSafeText(`Origen: ${producto.origen ?? "No especificado"}`), {
      x: textX,
      y: textY,
      size: 9.5,
      font: regular,
      color: MUTED_COLOR,
    });

    textY -= 18;
    for (let lineIndex = 0; lineIndex < descriptionLineCount; lineIndex += 1) {
      page.drawText(descriptionLines[lineIndex] ?? "", {
        x: textX,
        y: textY,
        size: 10,
        font: regular,
        color: BODY_COLOR,
      });
      textY -= 13;
    }

    y = cardY - 16;
  }

  page = addNewPage(pdfDoc);
  y = PAGE_HEIGHT - MARGIN;

  page.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 180,
    width: PAGE_WIDTH,
    height: 180,
    color: BRAND_COLOR,
  });

  page.drawText("Documentacion y certificaciones", {
    x: MARGIN,
    y: PAGE_HEIGHT - 74,
    size: 24,
    font: bold,
    color: rgb(1, 1, 1),
  });

  page.drawText("Compromisos documentales OceanFresh", {
    x: MARGIN,
    y: PAGE_HEIGHT - 104,
    size: 12,
    font: regular,
    color: rgb(0.84, 0.91, 1),
  });

  const onispaLogoPath = toPublicPath("productos", "ONISPA-1-1.png");
  if (await fileExists(onispaLogoPath)) {
    const onispaImage = await embedImage(pdfDoc, onispaLogoPath, imageCache);
    if (onispaImage) {
      const fittedSeal = fitInside(onispaImage.width, onispaImage.height, 120, 120);
      page.drawImage(onispaImage, {
        x: PAGE_WIDTH - MARGIN - fittedSeal.width,
        y: PAGE_HEIGHT - 150,
        width: fittedSeal.width,
        height: fittedSeal.height,
      });
    }
  }

  y = PAGE_HEIGHT - 220;
  const docsIntro = wrapText(
    "OceanFresh entrega esta documentacion de exportacion antes del embarque para garantizar seguridad sanitaria, trazabilidad y cumplimiento aduanero.",
    regular,
    11,
    PAGE_WIDTH - MARGIN * 2,
  );

  for (const line of docsIntro) {
    page.drawText(line, {
      x: MARGIN,
      y,
      size: 11,
      font: regular,
      color: BODY_COLOR,
    });
    y -= 16;
  }

  y -= 8;

  const certifications = [
    "Certificado de sanidad, origen, trazabilidad y temperatura emitido por ONISPA.",
    "Certificado de exportacion emitido por SMCP.",
    "Factura comercial.",
    "Packing List (Pick Up List).",
    "BL (Bill of Lading).",
  ];

  for (const item of certifications) {
    const bulletLines = wrapText(`- ${item}`, regular, 11, PAGE_WIDTH - MARGIN * 2 - 8);
    for (const line of bulletLines) {
      page.drawText(line, {
        x: MARGIN + 6,
        y,
        size: 11,
        font: regular,
        color: BODY_COLOR,
      });
      y -= 16;
    }
    y -= 4;
  }

  y -= 6;
  const finalNote = wrapText(
    "Todos los documentos anteriores son preparados y remitidos por OceanFresh para cada operacion internacional.",
    bold,
    10,
    PAGE_WIDTH - MARGIN * 2,
  );

  for (const line of finalNote) {
    page.drawText(line, {
      x: MARGIN,
      y,
      size: 10,
      font: bold,
      color: BRAND_COLOR,
    });
    y -= 14;
  }

  const pages = pdfDoc.getPages();
  pages.forEach((item, idx) => {
    item.drawText(`OceanFresh | Pagina ${idx + 1} de ${pages.length}`, {
      x: MARGIN,
      y: 24,
      size: 9,
      font: regular,
      color: MUTED_COLOR,
    });
  });

  return pdfDoc.save();
}

export async function GET() {
  try {
    const pdfBytes = await buildCatalogPdf();
    const body = Buffer.from(pdfBytes);

    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="catalogo-oceanfresh.pdf"',
        "Cache-Control": "public, max-age=0, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating PDF catalog", error);
    return NextResponse.json({ error: "No se pudo generar el catalogo PDF" }, { status: 500 });
  }
}
