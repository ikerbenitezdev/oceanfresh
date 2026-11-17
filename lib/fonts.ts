import { Figtree, Fraunces, Noto_Sans_Arabic } from "next/font/google";

// Shared by the root layout (Navbar, SiteFooter) and the home page, so the header, footer and home use one type system.
export const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

export const text = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

export const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

export const fontVariables = `${display.variable} ${text.variable} ${arabic.variable}`;
