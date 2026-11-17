import type { MetadataRoute } from "next";
import productos from "@/data/productos.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oceanfresh.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/productos`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contacto`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/politica-privacidad`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/politica-cookies`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/aviso-legal`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${siteUrl}/productos/${producto.id}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
