"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-24 md:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label block mb-4">Fale Conosco</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary heading-dots">
            Entre em Contato
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-body leading-relaxed mb-10">
              Estamos prontos para ajudá-lo a encontrar a propriedade perfeita.
              Agende uma consulta privada com nossos especialistas e descubra
              oportunidades exclusivas.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Endereço",
                  value: "Av. Brigadeiro Faria Lima, 3477\nSão Paulo - SP, 04538-133",
                },
                {
                  icon: Phone,
                  label: "Telefone",
                  value: "(11) 99999-9999\n(11) 3000-0000",
                },
                {
                  icon: Mail,
                  label: "E-mail",
                  value: "contato@mansaoprime.com.br",
                },
                {
                  icon: Clock,
                  label: "Horário",
                  value: "Seg - Sex: 9h às 19h\nSáb: 10h às 15h",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-12 h-12 bg-light flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold uppercase tracking-[1px] text-muted mb-1">
                      {item.label}
                    </div>
                    <div className="text-primary text-[15px] whitespace-pre-line">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gold text-5xl mb-4">&#10003;</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Mensagem Enviada
                  </h3>
                  <p className="text-muted">
                    Retornaremos em até 24 horas úteis.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Nome completo"
                    required
                    className="px-5 py-4 bg-light border border-transparent text-primary text-[14px] placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="E-mail"
                    required
                    className="px-5 py-4 bg-light border border-transparent text-primary text-[14px] placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Telefone"
                    className="px-5 py-4 bg-light border border-transparent text-primary text-[14px] placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
                  />
                  <select name="interest" defaultValue="" className="px-5 py-4 bg-light border border-transparent text-primary text-[14px] focus:outline-none focus:border-gold transition-colors invalid:text-muted/60" required>
                    <option value="" disabled hidden>Interesse</option>
                    <option value="compra">Comprar</option>
                    <option value="venda">Vender</option>
                    <option value="investimento">Investimento</option>
                    <option value="consultoria">Consultoria</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  placeholder="Conte-nos sobre o imóvel que procura..."
                  rows={5}
                  required
                  className="w-full px-5 py-4 bg-light border border-transparent text-primary text-[14px] placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors resize-none"
                />
                <button type="submit" className="btn-gold-filled w-full md:w-auto">
                  Enviar Mensagem
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
