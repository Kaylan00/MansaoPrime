"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Search, ChevronDown } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Início", href: "#home" },
  { name: "Sobre", href: "#about" },
  {
    name: "Imóveis",
    href: "#properties",
    submenu: [
      "Mansões",
      "Coberturas",
      "Apartamentos",
      "Casas de Campo",
      "Villas",
      "Terrenos",
    ],
  },
  { name: "Bairros", href: "#neighborhoods" },
  { name: "Depoimentos", href: "#testimonials" },
  { name: "Contato", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

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
        transition={{ duration: 0.6, delay: 2 }}
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
                <a
                  href={link.href}
                  className="text-[13px] font-semibold uppercase tracking-[1px] text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-1"
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={12} />}
                </a>
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
                            <a
                              key={item}
                              href="#properties"
                              className="block py-2 px-3 text-[13px] text-white/70 hover:text-gold hover:bg-white/5 transition-all duration-200"
                            >
                              {item}
                            </a>
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
            <button className="text-white/80 hover:text-gold transition-colors" aria-label="Buscar imóveis">
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
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-[15px] font-semibold uppercase tracking-[1px] text-white/80 hover:text-gold transition-colors py-3 border-b border-dark-border"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-dark-border">
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-2 text-[14px] text-white/70"
                >
                  <Phone size={14} className="text-gold" />
                  (11) 99999-9999
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
