import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";
import "./home.css";
import { fontVariables } from "@/lib/fonts";

/*
  Portada (tasteskill 2.5)
  kind: product · page-type product · site-kind other
  deal: hero photo (fondo2, calm sky on the left) · palette white-navy-tab (navy for the Atlantic and the
  brand's own navy, orange from the hulls and containers in the Nouadhibou port photo) · type fraunces
  (Fraunces / Figtree) · close close-word · rhythm dark-band (#frio) · buttons pill · moment word-highlight
  (#quienes-somos) · nav-mega, footer-dark and mark stack not applied: the site's own Navbar, SiteFooter and
  logo stay as they are (scope: the home page only).
*/

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <>
      {/* the hero's entrance waits for this mark (tasteskill motion.md); 700ms later the page stands as written */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.documentElement.classList.add('m-enter');setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700)",
        }}
      />
      <HomeClient fonts={fontVariables} />
    </>
  );
}
