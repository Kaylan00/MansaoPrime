"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { neighborhoods } from "@/lib/data";

export default function Neighborhoods() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="neighborhoods" className="py-24 md:py-36 bg-light">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label block mb-4">Localizações</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary heading-dots">
            Bairros Nobres
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((hood, i) => (
            <motion.div
              key={hood.name}
              className="group relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="relative aspect-[3/4] img-hover-scale">
                <Image
                  src={hood.image}
                  alt={hood.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-1">
                    {hood.name}
                  </h3>
                  <p className="text-white/60 text-[13px] mb-3">{hood.city}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold text-[13px] font-semibold">
                      {hood.properties} imóveis
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-gold transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
