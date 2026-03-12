import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "OceanFresh | Importación de Pescado desde Mauritania",
  description:
    "Importación directa de pescado fresco y congelado desde el Banco Pesquero de Mauritania. Calidad premium, cadena de frío certificada y exportación sin intermediarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <footer className="bg-blue-950 text-gray-400 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-xl font-bold text-white">
                  Ocean<span className="text-blue-300">Fresh</span>
                </span>
                <p className="text-sm mt-1">Importación directa desde Mauritania</p>
              </div>
              <div className="flex gap-8 text-sm">
                <a href="/" className="hover:text-white transition-colors">Inicio</a>
                <a href="/productos" className="hover:text-white transition-colors">Catálogo</a>
                <a href="/#quienes-somos" className="hover:text-white transition-colors">Quiénes Somos</a>
                <a href="/contacto" className="hover:text-white transition-colors">Contacto</a>
              </div>
            </div>
            <div className="border-t border-blue-900 mt-8 pt-6 text-center text-xs">
              © {new Date().getFullYear()} OceanFresh. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
