"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-36 bg-primary relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label block mb-4">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white heading-dots">
            O que dizem nossos clientes
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Quote
              size={48}
              className="text-gold/30 mx-auto mb-8"
              strokeWidth={1}
            />
            <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light italic font-[family-name:var(--font-lora)] mb-8">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-[15px]">
                  {testimonials[current].name}
                </div>
                <div className="text-gold text-[13px]">
                  {testimonials[current].role}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nav arrows */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              aria-label="Depoimento anterior"
              className="w-12 h-12 border border-white/20 text-white/60 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Próximo depoimento"
              className="w-12 h-12 border border-white/20 text-white/60 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
