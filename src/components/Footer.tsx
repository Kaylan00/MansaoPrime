"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const propertyTypes = [
  "Mansões",
  "Coberturas",
  "Apartamentos",
  "Casas de Campo",
  "Villas",
  "Terrenos Premium",
  "Imóveis Comerciais",
  "Lançamentos",
];

const regions = [
  "São Paulo",
  "Rio de Janeiro",
  "Florianópolis",
  "Brasília",
  "Campos do Jordão",
  "Bahia",
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="#home" className="inline-block mb-6">
              <span className="text-xl font-light tracking-[4px] uppercase">
                Mansão
              </span>
              <span className="text-xl font-bold tracking-[4px] uppercase text-gold">
                Prime
              </span>
            </Link>
            <p className="text-[14px] text-white/50 leading-relaxed mb-6">
              Há mais de 15 anos conectando pessoas a propriedades
              extraordinárias. Excelência, discrição e resultados.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="w-10 h-10 border border-dark-border flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-[2px] mb-6">
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-[14px] text-white/50">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span>
                  Av. Brigadeiro Faria Lima, 3477
                  <br />
                  São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-3 text-[14px] text-white/50">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <span>contato@mansaoprime.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-[14px] text-white/50">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <span>(11) 99999-9999</span>
              </div>
            </div>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-[2px] mb-6">
              Tipos de Imóveis
            </h4>
            <ul className="space-y-2">
              {propertyTypes.map((type) => (
                <li key={type}>
                  <a
                    href="#properties"
                    className="text-[14px] text-white/50 hover:text-gold transition-colors duration-200"
                  >
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-[2px] mb-6">
              Regiões
            </h4>
            <ul className="space-y-2">
              {regions.map((region) => (
                <li key={region}>
                  <a
                    href="#neighborhoods"
                    className="text-[14px] text-white/50 hover:text-gold transition-colors duration-200"
                  >
                    {region}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Developer Banner */}
      <div className="border-t border-dark-border bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white text-[15px] font-semibold mb-1">
              Quer um site como esse para o seu negócio?
            </p>
            <p className="text-white/50 text-[13px]">
              Sites profissionais, modernos e sob medida. Vamos conversar!
            </p>
          </div>
          <a
            href="https://wa.me/5528999087714?text=Olá! Vi seu portfólio e gostaria de um orçamento para um site."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-filled flex items-center gap-3 whitespace-nowrap"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/40">
            &copy; {new Date().getFullYear()} Mansão Prime. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[13px] text-white/40 hover:text-gold transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-[13px] text-white/40 hover:text-gold transition-colors"
            >
              Termos de Uso
            </a>
            <span className="text-[13px] text-white/40">
              Desenvolvido por{" "}
              <span className="text-gold hover:text-gold-light transition-colors">
                Kaylan Argollo
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        className="fixed bottom-6 right-6 w-12 h-12 bg-gold text-white flex items-center justify-center hover:bg-gold-dark transition-colors z-40 shadow-lg"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
