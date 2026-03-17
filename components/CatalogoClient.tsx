"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDirection, type Locale } from "@/lib/locale";
import { useLocale } from "@/lib/locale-client";

type Producto = {
  id: string;
  nombre: string;
  origen: string;
  descripcion: string;
  imagen_url: string;
  categoria: string;
  temporada: string;
  ficha_tecnica?: {
    nombre_cientifico?: string;
  };
};

type CatalogoClientProps = {
  productos: Producto[];
};

type CatalogCopy = {
  badge: string;
  title: string;
  description: string;
  searchLabel: string;
  searchPlaceholder: string;
  typeLabel: string;
  all: string;
  noResultsTitle: string;
  noResultsDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  season: string;
  results: (count: number) => string;
  categoryLabels: Record<string, string>;
};

const copyByLocale: Record<Locale, CatalogCopy> = {
  es: {
    badge: "Importación directa",
    title: "Catálogo de Productos",
    description:
      "Todas nuestras especies son seleccionadas en lonja, procesadas en frío y certificadas para exportación. Disponibilidad y calibres a consultar.",
    searchLabel: "Buscar por nombre",
    searchPlaceholder: "Ej. atún, bacalao, pulpo...",
    typeLabel: "Filtrar por tipo",
    all: "Todos",
    noResultsTitle: "No hay resultados",
    noResultsDescription:
      "No hemos encontrado productos con ese nombre o dentro de ese tipo. Prueba con otra búsqueda o vuelve a la categoría Todos.",
    ctaTitle: "¿No encuentras lo que buscas?",
    ctaDescription:
      "Trabajamos con más de 15 especies. Contáctanos y te enviaremos la lista completa con disponibilidad y precios.",
    ctaButton: "Solicitar información",
    season: "Temporada",
    results: (count) => `${count} producto${count === 1 ? "" : "s"} encontrado${count === 1 ? "" : "s"}.`,
    categoryLabels: {
      Pescado: "Pescado",
      Condrictios: "Condrictios",
      "Crustáceos": "Crustáceos",
      "Cefalópodos": "Cefalópodos",
    },
  },
  en: {
    badge: "Direct import",
    title: "Product Catalog",
    description:
      "All species are selected directly at landing ports, processed under cold chain, and certified for export. Availability and sizes on request.",
    searchLabel: "Search by name",
    searchPlaceholder: "Ex. tuna, cod, octopus...",
    typeLabel: "Filter by type",
    all: "All",
    noResultsTitle: "No results",
    noResultsDescription:
      "No products were found for that name or type. Try another query or switch back to All.",
    ctaTitle: "Can't find what you need?",
    ctaDescription:
      "We work with over 15 species. Contact us and we will send full availability and pricing.",
    ctaButton: "Request information",
    season: "Season",
    results: (count) => `${count} product${count === 1 ? "" : "s"} found.`,
    categoryLabels: {
      Pescado: "Fish",
      Condrictios: "Cartilaginous fish",
      "Crustáceos": "Crustaceans",
      "Cefalópodos": "Cephalopods",
    },
  },
  fr: {
    badge: "Import direct",
    title: "Catalogue des Produits",
    description:
      "Toutes nos especes sont selectionnees en criée, traitees sous chaine du froid et certifiees pour l'exportation. Disponibilite et calibres sur demande.",
    searchLabel: "Rechercher par nom",
    searchPlaceholder: "Ex. thon, morue, poulpe...",
    typeLabel: "Filtrer par type",
    all: "Tous",
    noResultsTitle: "Aucun resultat",
    noResultsDescription:
      "Aucun produit ne correspond a ce nom ou ce type. Essayez une autre recherche ou revenez a Tous.",
    ctaTitle: "Vous ne trouvez pas ce que vous cherchez ?",
    ctaDescription:
      "Nous travaillons avec plus de 15 especes. Contactez-nous pour recevoir la liste complete avec disponibilite et prix.",
    ctaButton: "Demander des informations",
    season: "Saison",
    results: (count) => `${count} produit${count === 1 ? "" : "s"} trouve${count === 1 ? "" : "s"}.`,
    categoryLabels: {
      Pescado: "Poisson",
      Condrictios: "Poissons cartilagineux",
      "Crustáceos": "Crustaces",
      "Cefalópodos": "Cephalopodes",
    },
  },
  ar: {
    badge: "استيراد مباشر",
    title: "كتالوج المنتجات",
    description:
      "يتم اختيار جميع الاصناف مباشرة من الموانئ ومعالجتها ضمن سلسلة تبريد معتمدة ومطابقة للتصدير. التوفر والمقاسات حسب الطلب.",
    searchLabel: "ابحث بالاسم",
    searchPlaceholder: "مثال: تونة، قد، اخطبوط...",
    typeLabel: "تصفية حسب النوع",
    all: "الكل",
    noResultsTitle: "لا توجد نتائج",
    noResultsDescription:
      "لم يتم العثور على منتجات بهذا الاسم او النوع. جرب بحثا اخر او عد الى خيار الكل.",
    ctaTitle: "لم تجد ما تبحث عنه؟",
    ctaDescription:
      "نعمل مع اكثر من 15 نوعا. تواصل معنا وسنرسل لك قائمة كاملة بالتوفر والاسعار.",
    ctaButton: "طلب معلومات",
    season: "الموسم",
    results: (count) => `تم العثور على ${count} منتج.`,
    categoryLabels: {
      Pescado: "اسماك",
      Condrictios: "اسماك غضروفية",
      "Crustáceos": "قشريات",
      "Cefalópodos": "رأسيات الارجل",
    },
  },
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function CatalogoClient({ productos }: CatalogoClientProps) {
  const locale = useLocale();
  const t = copyByLocale[locale];
  const dir = getDirection(locale);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("ALL");

  const categorias = ["ALL", ...Array.from(new Set(productos.map((producto) => producto.categoria))).sort()];

  const busquedaNormalizada = normalizeText(busqueda.trim());

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "ALL" || producto.categoria === categoriaActiva;

    const coincideBusqueda =
      busquedaNormalizada.length === 0 ||
      normalizeText(producto.nombre).includes(busquedaNormalizada) ||
      normalizeText(producto.ficha_tecnica?.nombre_cientifico ?? "").includes(busquedaNormalizada);

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" dir={dir}>
      <div className="text-center mb-14">
        <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
          {t.badge}
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
          {t.title}
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          {t.description}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-8 mb-12">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          <label className="block">
            <span className="block text-sm font-semibold text-gray-700 mb-2">
              {t.searchLabel}
            </span>
            <input
              type="text"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-semibold text-gray-700 mb-2">
              {t.typeLabel}
            </span>
            <select
              value={categoriaActiva}
              onChange={(event) => setCategoriaActiva(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria === "ALL" ? t.all : t.categoryLabels[categoria] ?? categoria}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {categorias.map((categoria) => {
            const isActive = categoria === categoriaActiva;

            return (
              <button
                key={categoria}
                type="button"
                onClick={() => setCategoriaActiva(categoria)}
                className={
                  isActive
                    ? "rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                    : "rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                }
              >
                {categoria === "ALL" ? t.all : t.categoryLabels[categoria] ?? categoria}
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-gray-500">
          {t.results(productosFiltrados.length)}
        </p>
      </div>

      {productosFiltrados.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map((producto) => (
            <Link
              key={producto.id}
              href={`/productos/${producto.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-4">
                <Image
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  fill
                  className="object-contain p-4 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {t.categoryLabels[producto.categoria] ?? producto.categoria}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {producto.nombre}
                </h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <span>📍</span> {producto.origen}
                </p>
                <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                  {producto.descripcion}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-xs text-gray-400">
                    <span className="font-medium text-gray-600">{t.season}:</span>{" "}
                    {producto.temporada}
                  </div>
                  <span className="text-blue-600 text-sm font-semibold group-hover:underline">
                    Ver ficha →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50 px-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{t.noResultsTitle}</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            {t.noResultsDescription}
          </p>
        </div>
      )}

      <div className="mt-16 bg-blue-950 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">
          {t.ctaTitle}
        </h2>
        <p className="text-gray-300 mb-6">
          {t.ctaDescription}
        </p>
        <Link
          href="/contacto"
          className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {t.ctaButton}
        </Link>
      </div>
    </div>
  );
}