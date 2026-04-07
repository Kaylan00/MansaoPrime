"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { stats } from "@/lib/data";

function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      className="relative aspect-video max-w-4xl mx-auto mb-24 overflow-hidden rounded-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        preload="metadata"
        controls={playing}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!playing && (
        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
          <motion.button
            onClick={() => {
              setPlaying(true);
              videoRef.current?.play();
            }}
            className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center hover:bg-gold transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Reproduzir vídeo"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

function Counter({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="counter-number text-gold">{value}</div>
      <div className="text-[13px] uppercase tracking-[2px] text-muted mt-2 font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Centered intro */}
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label block mb-4">Essência Única</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary heading-dots mb-8">
            Mansão Prime
          </h2>
          <p className="text-body leading-[1.875] mt-8">
            Há mais de 15 anos, a Mansão Prime é referência no mercado
            imobiliário de alto padrão. Nossa missão é conectar pessoas a
            propriedades extraordinárias, oferecendo um serviço personalizado e
            discreto que entende as nuances do luxo verdadeiro.
          </p>
          <p className="text-body leading-[1.875] mt-4">
            Com uma curadoria rigorosa e uma equipe de especialistas dedicados,
            transformamos o sonho de viver com exclusividade em realidade.
            Atuamos nas localizações mais privilegiadas do Brasil.
          </p>
        </motion.div>

        {/* Video + Image section */}
        <VideoSection />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <Counter
              key={stat.label}
              value={stat.number}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
