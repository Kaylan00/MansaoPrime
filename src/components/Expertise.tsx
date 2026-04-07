"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Expertise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36 bg-light">
      <div className="max-w-[1400px] mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label block mb-4">
              Consultoria Exclusiva
            </span>
            <h2 className="text-3xl md:text-[42px] font-bold text-primary leading-tight heading-dots left mb-8">
              Roberto Santana
            </h2>
            <p className="text-body leading-[1.875] mt-8">
              Com mais de duas décadas no mercado imobiliário de luxo, Roberto
              Santana é reconhecido como um dos maiores especialistas em
              propriedades de alto padrão do Brasil. Sua visão única combina
              conhecimento profundo do mercado com sensibilidade estética
              refinada.
            </p>
            <p className="text-body leading-[1.875] mt-4">
              Formado em Arquitetura pela USP e com MBA em Real Estate pela
              Columbia University, Roberto lidera uma equipe de consultores que
              compartilham sua paixão por excelência e atenção aos detalhes.
            </p>
            <div className="mt-8 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-gold">500+</div>
                <div className="text-[13px] uppercase tracking-[1px] text-muted mt-1">
                  Negociações
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">20</div>
                <div className="text-[13px] uppercase tracking-[1px] text-muted mt-1">
                  Anos de Mercado
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                alt="Roberto Santana - Consultor Imobiliário"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-gold hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
