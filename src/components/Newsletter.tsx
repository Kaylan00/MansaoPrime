"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 md:py-28 bg-lighter">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            Fique por dentro das novidades
          </h3>
          <p className="text-muted text-[15px] mb-10">
            Não perca nada do universo Mansão Prime. Inscreva-se para receber
            propriedades exclusivas antes de todos.
          </p>

          {submitted ? (
            <motion.div
              className="text-gold text-lg font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Obrigado! Você receberá nossas novidades em breve.
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col md:flex-row gap-3"
            >
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Seu nome"
                required
                className="flex-1 px-5 py-4 bg-white border border-border text-primary text-[14px] placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Seu e-mail"
                required
                className="flex-1 px-5 py-4 bg-white border border-border text-primary text-[14px] placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="btn-gold-filled flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Send size={14} />
                Inscrever-se
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
