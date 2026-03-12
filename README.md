# OceanFresh

Professional website for **OceanFresh**, a fish import company sourcing directly from the Mauritanian fishing grounds — one of the richest in the Atlantic Ocean.

Built with **Next.js 16** (App Router) and **Tailwind CSS v4**.

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, stats bar, Quiénes Somos, product preview |
| `/productos` | Full product catalog grid |
| `/productos/[id]` | Dynamic product detail page with technical specs |
| `/contacto` | Contact form |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
app/
  page.tsx                  # Home page
  productos/
    page.tsx                # Catalog page
    [id]/
      page.tsx              # Product detail (dynamic route)
  contacto/
    page.tsx                # Contact form
  layout.tsx                # Root layout (Navbar + Footer)
  globals.css               # Global styles (system font stack)
components/
  Navbar.tsx                # Responsive navigation
data/
  productos.json            # Product database (id, nombre, origen, descripcion, imagen_url, ...)
public/
  uploads/                  # Place product images here
```

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
