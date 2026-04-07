"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { properties } from "@/lib/data";

const filters = [
  "Todos",
  "Mansão",
  "Cobertura",
  "Apartamento",
  "Villa",
  "Casa de Campo",
];

export default function Properties() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered =
    activeFilter === "Todos"
      ? properties
      : properties.filter((p) => p.type === activeFilter);

  return (
    <section id="properties" className="py-24 md:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label block mb-4">Portfólio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary heading-dots">
            Nossas Propriedades
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-[13px] font-semibold uppercase tracking-[1px] border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gold border-gold text-white"
                  : "border-border text-muted hover:border-gold hover:text-gold"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0">
          {filtered.map((property, i) => (
            <motion.div
              key={property.id}
              className="property-card group relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              layout
            >
              <div className="relative aspect-[4/5] img-hover-scale">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="property-card-overlay" />

                {/* Featured badge */}
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-gold text-white text-[11px] font-bold uppercase tracking-[1px] px-3 py-1 z-10">
                    Destaque
                  </div>
                )}

                {/* Hover content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[400ms] z-10">
                  <div className="text-gold text-[13px] font-semibold mb-1">
                    {property.price}
                  </div>
                  <h3 className="text-white text-lg font-bold mb-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-white/60 text-[13px] mb-3">
                    <MapPin size={12} />
                    {property.location}
                  </div>
                  <div className="flex gap-4 text-white/70 text-[12px]">
                    <span className="flex items-center gap-1">
                      <Bed size={14} /> {property.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={14} /> {property.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize2 size={14} /> {property.area}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="bg-primary p-4 flex items-center justify-between">
                <span className="text-white text-[14px] font-semibold">
                  {property.title}
                </span>
                <span className="text-gold text-lg font-light">+</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a href="#contact" className="btn-gold">
            Ver Todos os Imóveis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
