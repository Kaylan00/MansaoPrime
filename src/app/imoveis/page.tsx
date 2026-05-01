import { Suspense } from "react";
import ImoveisContent from "./ImoveisContent";

export const metadata = {
  title: "Imóveis | Mansão Prime",
  description:
    "Explore nosso portfólio completo de imóveis de alto padrão. Mansões, coberturas, apartamentos, villas e terrenos exclusivos.",
};

export default function ImoveisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <ImoveisContent />
    </Suspense>
  );
}
