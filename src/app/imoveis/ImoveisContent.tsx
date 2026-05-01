"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin, SlidersHorizontal, X, ChevronDown, Phone } from "lucide-react";
import { properties, Property } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TYPES = ["Todos", "Mansão", "Cobertura", "Apartamento", "Villa", "Casa de Campo", "Terreno"];

const PRICE_RANGES = [
  { label: "Qualquer preço", min: 0, max: Infinity },
  { label: "Até R$ 10M", min: 0, max: 10000000 },
  { label: "R$ 10M – R$ 20M", min: 10000000, max: 20000000 },
  { label: "R$ 20M – R$ 30M", min: 20000000, max: 30000000 },
  { label: "Acima de R$ 30M", min: 30000000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Destaques primeiro", value: "featured" },
  { label: "Menor preço", value: "price-asc" },
  { label: "Maior preço", value: "price-desc" },
  { label: "Maior área", value: "area-desc" },
];

function sortProperties(list: Property[], sort: string): Property[] {
  return [...list].sort((a, b) => {
    switch (sort) {
      case "price-asc":  return a.priceValue - b.priceValue;
      case "price-desc": return b.priceValue - a.priceValue;
      case "area-desc":  return b.areaValue - a.areaValue;
      default:           return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });
}

export default function ImoveisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tipoParam = searchParams.get("tipo") || "Todos";

  const [activeType, setActiveType] = useState(tipoParam);
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setActiveType(tipoParam);
  }, [tipoParam]);

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    const params = new URLSearchParams(searchParams.toString());
    if (type === "Todos") {
      params.delete("tipo");
    } else {
      params.set("tipo", type);
    }
    router.replace(`/imoveis${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceRange];
    let list = properties.filter((p) => {
      const typeMatch = activeType === "Todos" || p.type === activeType;
      const priceMatch = p.priceValue >= range.min && p.priceValue <= range.max;
      return typeMatch && priceMatch;
    });
    return sortProperties(list, sort);
  }, [activeType, priceRange, sort]);

  return (
    <>
      <Header noDelay />

      {/* Page Hero */}
      <section className="relative h-[38vh] min-h-[260px] overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="Imóveis de luxo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/50 to-primary/85" />
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 pb-10">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 uppercase tracking-[1.5px] mb-3">
            <Link href="/" className="hover:text-gold transition-colors">Início</Link>
            <span>/</span>
            <span className="text-gold">Imóveis</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Nossos Imóveis
          </h1>
          <p className="text-white/60 text-[15px] mt-2">
            {filtered.length} {filtered.length === 1 ? "propriedade encontrada" : "propriedades encontradas"}
            {activeType !== "Todos" && ` em ${activeType}`}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* Desktop filters */}
          <div className="hidden md:flex items-center gap-4 py-3 flex-wrap">
            {/* Type chips */}
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[1px] border transition-all duration-200 whitespace-nowrap ${
                    activeType === type
                      ? "bg-gold border-gold text-white"
                      : "border-border text-muted hover:border-gold hover:text-gold"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="appearance-none pl-3 pr-8 py-1.5 text-[12px] font-semibold uppercase tracking-[1px] border border-border text-muted hover:border-gold focus:border-gold focus:outline-none transition-colors bg-white cursor-pointer"
              >
                {PRICE_RANGES.map((r, i) => (
                  <option key={i} value={i}>{r.label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 text-[12px] font-semibold uppercase tracking-[1px] border border-border text-muted hover:border-gold focus:border-gold focus:outline-none transition-colors bg-white cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>

          {/* Mobile filters toggle */}
          <div className="flex md:hidden items-center justify-between py-3">
            <p className="text-[13px] text-muted">
              <span className="font-semibold text-primary">{filtered.length}</span> imóveis
              {activeType !== "Todos" && <span className="text-gold ml-1">· {activeType}</span>}
            </p>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[1px] text-primary border border-border px-3 py-1.5"
            >
              <SlidersHorizontal size={13} />
              Filtros
              {filtersOpen && <X size={13} />}
            </button>
          </div>

          {/* Mobile filter panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                className="md:hidden pb-4 space-y-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Type */}
                <div>
                  <p className="text-[11px] uppercase tracking-[2px] text-muted mb-2">Tipo</p>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => { handleTypeChange(type); setFiltersOpen(false); }}
                        className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1px] border transition-all ${
                          activeType === type
                            ? "bg-gold border-gold text-white"
                            : "border-border text-muted"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Price & Sort */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full appearance-none pl-3 pr-7 py-2 text-[12px] border border-border text-muted focus:outline-none bg-white"
                    >
                      {PRICE_RANGES.map((r, i) => (
                        <option key={i} value={i}>{r.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                  </div>
                  <div className="flex-1 relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="w-full appearance-none pl-3 pr-7 py-2 text-[12px] border border-border text-muted focus:outline-none bg-white"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid */}
      <main className="bg-lighter min-h-[60vh] py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                className="flex flex-col items-center justify-center py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-5xl mb-4 opacity-20">🏠</div>
                <p className="text-primary font-semibold text-lg mb-2">Nenhum imóvel encontrado</p>
                <p className="text-muted text-sm mb-6">Tente ajustar os filtros</p>
                <button
                  onClick={() => { handleTypeChange("Todos"); setPriceRange(0); }}
                  className="btn-gold text-sm"
                >
                  Limpar filtros
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeType}-${priceRange}-${sort}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((property, i) => (
                  <PropertyCard key={property.id} property={property} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* CTA Banner */}
      <section className="bg-primary py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[12px] uppercase tracking-[3px] mb-3">Consultoria Exclusiva</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Não encontrou o imóvel ideal?
          </h2>
          <p className="text-white/60 text-[15px] mb-8 leading-relaxed">
            Nossos especialistas têm acesso a propriedades exclusivas fora do mercado. Agende uma consulta confidencial.
          </p>
          <a
            href="tel:+5511999999999"
            className="inline-flex items-center gap-3 btn-gold-filled"
          >
            <Phone size={16} />
            Falar com Especialista
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  return (
    <motion.div
      className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-400"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {property.featured && (
            <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[1px] px-2.5 py-1">
              Destaque
            </span>
          )}
          <span className="bg-primary/80 text-white text-[10px] font-semibold uppercase tracking-[1px] px-2.5 py-1 backdrop-blur-sm">
            {property.type}
          </span>
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <a
            href="tel:+5511999999999"
            className="bg-gold text-white text-[11px] font-bold uppercase tracking-[2px] px-5 py-2.5 hover:bg-gold-dark transition-colors"
          >
            Agendar Visita
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-primary font-bold text-[15px] mb-1 leading-snug">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-muted text-[12px] mb-3">
          <MapPin size={11} className="text-gold flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Stats */}
        {property.type !== "Terreno" ? (
          <div className="flex items-center gap-3 text-[12px] text-muted mb-3 border-t border-border pt-3">
            <span className="flex items-center gap-1">
              <Bed size={12} className="text-gold" /> {property.beds}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={12} className="text-gold" /> {property.baths}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Maximize2 size={11} className="text-gold" /> {property.area}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[12px] text-muted mb-3 border-t border-border pt-3">
            <Maximize2 size={11} className="text-gold" />
            <span>{property.area} de área</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gold font-bold text-[15px]">{property.price}</span>
          <a
            href="tel:+5511999999999"
            className="text-[11px] font-semibold uppercase tracking-[1px] text-primary/60 hover:text-gold transition-colors"
          >
            Consultar →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
