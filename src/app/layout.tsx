import type { Metadata } from "next";
import { Montserrat, Lora } from "next/font/google";
import "./globals.scss";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mansão Prime | Imóveis de Luxo",
  description:
    "Descubra propriedades exclusivas e imóveis de alto padrão. A Mansão Prime oferece uma experiência única em imóveis de luxo.",
  keywords:
    "imóveis de luxo, propriedades exclusivas, alto padrão, mansões, coberturas, penthouse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${lora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
