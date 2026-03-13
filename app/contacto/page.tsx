import { Metadata } from "next";
import ContactoClient from "@/components/ContactoClient";

export const metadata: Metadata = {
  title: "Contacto | OceanFresh",
  description:
    "Solicita información sobre nuestros productos o una cotización personalizada. Equipo disponible para importadores, distribuidores y grandes superficies.",
};

export default function ContactoPage() {
  return <ContactoClient />;
}
