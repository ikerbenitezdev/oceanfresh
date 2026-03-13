"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function CatalogoClient({ productos }: CatalogoClientProps) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const categorias = [
    "Todos",
    ...Array.from(new Set(productos.map((producto) => producto.categoria))).sort(),
  ];

  const busquedaNormalizada = normalizeText(busqueda.trim());

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "Todos" || producto.categoria === categoriaActiva;

    const coincideBusqueda =
      busquedaNormalizada.length === 0 ||
      normalizeText(producto.nombre).includes(busquedaNormalizada) ||
      normalizeText(producto.ficha_tecnica?.nombre_cientifico ?? "").includes(busquedaNormalizada);

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
          Importación directa
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
          Catálogo de Productos
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          Todas nuestras especies son seleccionadas en lonja, procesadas en
          frío y certificadas para exportación. Disponibilidad y calibres a
          consultar.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-8 mb-12">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          <label className="block">
            <span className="block text-sm font-semibold text-gray-700 mb-2">
              Buscar por nombre
            </span>
            <input
              type="text"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Ej. atún, bacalao, pulpo..."
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-semibold text-gray-700 mb-2">
              Filtrar por tipo
            </span>
            <select
              value={categoriaActiva}
              onChange={(event) => setCategoriaActiva(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
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
                {categoria}
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-gray-500">
          {productosFiltrados.length} producto{productosFiltrados.length === 1 ? "" : "s"} encontrado{productosFiltrados.length === 1 ? "" : "s"}.
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
                    {producto.categoria}
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
                    <span className="font-medium text-gray-600">Temporada:</span>{" "}
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
          <h2 className="text-2xl font-bold text-gray-900">No hay resultados</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            No hemos encontrado productos con ese nombre o dentro de ese tipo.
            Prueba con otra búsqueda o vuelve a la categoría "Todos".
          </p>
        </div>
      )}

      <div className="mt-16 bg-blue-950 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="text-gray-300 mb-6">
          Trabajamos con más de 15 especies. Contáctanos y te enviaremos la
          lista completa con disponibilidad y precios.
        </p>
        <Link
          href="/contacto"
          className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Solicitar información
        </Link>
      </div>
    </div>
  );
}