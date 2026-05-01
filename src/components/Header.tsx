"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Search, ChevronDown, Bed, Bath, Maximize2, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { properties } from "@/lib/data";

const submenuItems = [
  { label: "Mansões",       tipo: "Mansão" },
  { label: "Coberturas",    tipo: "Cobertura" },
  { label: "Apartamentos",  tipo: "Apartamento" },
  { label: "Casas de Campo",tipo: "Casa de Campo" },
  { label: "Villas",        tipo: "Villa" },
  { label: "Terrenos",      tipo: "Terreno" },
];

const navLinks = [
  { name: "Início", href: "/#home" },
  { name: "Sobre", href: "/#about" },
  {
    name: "Imóveis",
    href: "/imoveis",
    submenu: submenuItems,
  },
  { name: "Bairros", href: "/#neighborhoods" },
  { name: "Depoimentos", href: "/#testimonials" },
  { name: "Contato", href: "/#contact" },
];

export default function Header({ noDelay = false }: { noDelay?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  const searchResults = searchQuery.length >= 2
    ? properties.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.price.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: noDelay ? 0 : 2 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-1">
            <span className="text-2xl font-light tracking-[4px] uppercase text-white">
              Mansão
            </span>
            <span className="text-2xl font-bold tracking-[4px] uppercase text-gold">
              Prime
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() =>
                  link.submenu && setActiveSubmenu(link.name)
                }
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className={`text-[13px] font-semibold uppercase tracking-[1px] transition-colors duration-300 flex items-center gap-1 ${
                    pathname === link.href ? "text-gold" : "text-white/80 hover:text-gold"
                  }`}
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={12} />}
                </Link>
                {link.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === link.name && (
                      <motion.div
                        className="absolute top-full left-0 pt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-primary/95 backdrop-blur-md border border-dark-border p-4 min-w-[200px]">
                          {link.submenu.map((item) => (
                            <Link
                              key={item.tipo}
                              href={`/imoveis?tipo=${encodeURIComponent(item.tipo)}`}
                              onClick={() => setActiveSubmenu(null)}
                              className="block py-2 px-3 text-[13px] text-white/70 hover:text-gold hover:bg-white/5 transition-all duration-200"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+5511999999999"
              className="flex items-center gap-2 text-[13px] text-white/80 hover:text-gold transition-colors"
            >
              <Phone size={14} />
              <span>(11) 99999-9999</span>
            </a>
            <button
              className="text-white/80 hover:text-gold transition-colors"
              aria-label="Buscar imóveis"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-primary/98 backdrop-blur-lg flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setSearchOpen(false)}
                className="text-white/60 hover:text-gold transition-colors"
                aria-label="Fechar busca"
              >
                <X size={28} />
              </button>
            </div>

            {/* Search input */}
            <div className="max-w-3xl mx-auto w-full px-6 mt-8">
              <div className="relative">
                <Search size={22} className="absolute left-0 top-1/2 -translate-y-1/2 text-gold" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nome, localização, tipo..."
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-gold text-white text-2xl md:text-3xl font-light pl-10 pb-4 outline-none placeholder:text-white/30 transition-colors"
                />
              </div>

              {/* Results */}
              <div className="mt-10 overflow-y-auto max-h-[60vh]">
                {searchQuery.length >= 2 && searchResults.length === 0 && (
                  <p className="text-white/40 text-center text-lg">
                    Nenhum imóvel encontrado para &ldquo;{searchQuery}&rdquo;
                  </p>
                )}

                {searchResults.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-white/40 text-[13px] uppercase tracking-[2px] mb-6">
                      {searchResults.length} {searchResults.length === 1 ? "resultado" : "resultados"}
                    </p>
                    {searchResults.map((property) => (
                      <motion.a
                        key={property.id}
                        href="#properties"
                        onClick={() => setSearchOpen(false)}
                        className="flex gap-5 p-4 hover:bg-white/5 transition-colors rounded-sm group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="112px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-[15px] group-hover:text-gold transition-colors">
                            {property.title}
                          </h4>
                          <div className="flex items-center gap-1 text-white/50 text-[13px] mt-1">
                            <MapPin size={12} />
                            {property.location}
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-gold font-semibold text-[14px]">
                              {property.price}
                            </span>
                            <span className="flex items-center gap-1 text-white/40 text-[12px]">
                              <Bed size={12} /> {property.beds}
                            </span>
                            <span className="flex items-center gap-1 text-white/40 text-[12px]">
                              <Bath size={12} /> {property.baths}
                            </span>
                            <span className="flex items-center gap-1 text-white/40 text-[12px]">
                              <Maximize2 size={12} /> {property.area}
                            </span>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}

                {searchQuery.length < 2 && (
                  <p className="text-white/30 text-center text-[15px]">
                    Digite pelo menos 2 caracteres para buscar
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[45]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-primary z-[55] p-8 pt-24 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[15px] font-semibold uppercase tracking-[1px] transition-colors py-3 border-b border-dark-border block ${
                      pathname === link.href ? "text-gold" : "text-white/80 hover:text-gold"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-dark-border space-y-4">
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-2 text-[14px] text-white/70"
                >
                  <Phone size={14} className="text-gold" />
                  (11) 99999-9999
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => setSearchOpen(true), 300);
                  }}
                  className="flex items-center gap-2 text-[14px] text-white/70 hover:text-gold transition-colors"
                >
                  <Search size={14} className="text-gold" />
                  Buscar imóveis
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
