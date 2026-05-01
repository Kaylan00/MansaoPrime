"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    subtitle: "EXCLUSIVIDADE & SOFISTICAÇÃO",
    title: "Viva o\nExtraordinário",
    description:
      "Descubra propriedades que redefinem o conceito de luxo. Cada imóvel é cuidadosamente selecionado para oferecer uma experiência única.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    subtitle: "CURADORIA DE ALTO PADRÃO",
    title: "Residências\nImpecáveis",
    description:
      "Uma seleção exclusiva das mais sofisticadas propriedades do Brasil. Encontre o lar que traduz seu estilo de vida.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    subtitle: "PATRIMÔNIO & INVESTIMENTO",
    title: "Elegância\nAtemporal",
    description:
      "Invista em propriedades que valorizam com o tempo. Localização privilegiada, arquitetura premiada e acabamentos impecáveis.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-primary/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 flex items-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={current}>
              <motion.span
                className="section-label text-gold-light block mb-6"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {slides[current].subtitle}
              </motion.span>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 whitespace-pre-line"
                initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                className="text-lg text-white/70 leading-relaxed mb-10 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <a href="/imoveis" className="btn-gold-filled">
                  Ver Imóveis
                </a>
                <a href="#contact" className="btn-gold">
                  Agendar Visita
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === current ? "w-12 bg-gold" : "w-6 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 right-10 z-10 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[11px] uppercase tracking-[3px] text-white/50 rotate-90 origin-center translate-y-6">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
