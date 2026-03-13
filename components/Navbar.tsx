"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpeg"
              alt="OceanFresh Logo"
              width={66}
              height={66}
              className="h-14 w-14 object-contain rounded-full bg-white p-0.5"
              priority
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-blue-500 transition-colors text-md font-medium">
              Inicio
            </Link>
            <Link href="/productos" className="text-white hover:text-blue-500 transition-colors text-md font-medium">
              Catálogo
            </Link>
            <Link href="/#quienes-somos" className="text-white hover:text-blue-500 transition-colors text-md font-medium">
              Quiénes Somos
            </Link>
            <Link
              href="/contacto"
              className="bg-blue-500 hover:bg-blue-400 text-white text-md font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white hover:text-blue-500 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-blue-800 space-y-3">
            <Link href="/" className="block text-white hover:text-blue-500 py-1 text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
            <Link href="/productos" className="block text-white hover:text-blue-500 py-1 text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Catálogo
            </Link>
            <Link href="/#quienes-somos" className="block text-white hover:text-blue-500 py-1 text-sm font-medium" onClick={() => setMenuOpen(false)}>
              Quiénes Somos
            </Link>
            <Link href="/contacto" className="block bg-blue-500 hover:bg-blue-400 text-blue-500 text-sm font-semibold px-4 py-2 rounded-md transition-colors w-fit" onClick={() => setMenuOpen(false)}>
              Contacto
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
