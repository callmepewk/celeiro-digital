import React from "react";
import { motion } from "framer-motion";
import { Target, Heart, Eye } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Missão",
    text: "Democratizar o acesso à tecnologia e ao conhecimento digital em Porto Firme, capacitando pessoas de todas as idades para o mercado digital.",
    color: "#39FF14",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser referência em educação tecnológica no interior de Minas Gerais, transformando vidas através da inclusão digital.",
    color: "#00E5FF",
  },
];

const methodology = {
  icon: Heart,
  title: "Metodologia",
  text: "Diagnóstico detalhado das necessidades, planejamento estratégico personalizado, implementação com suporte contínuo, acompanhamento e otimização permanente, resultados mensuráveis e transparentes.",
  color: "#39FF14",
};

export default function AboutSection() {
  return (
    <section id="sobre" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00E5FF] text-sm font-semibold tracking-widest uppercase">
            Quem somos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Sobre o Celeiro Digital
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Nascemos da vontade de transformar Porto Firme em um polo de
            educação digital. Um espaço onde tecnologia encontra comunidade.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-500"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${card.color}08, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon className="w-6 h-6" style={{ color: card.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-500"
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${methodology.color}08, transparent 70%)`,
            }}
          />
          <div className="relative z-10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${methodology.color}15` }}
            >
              <methodology.icon className="w-6 h-6" style={{ color: methodology.color }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{methodology.title}</h3>
            <p className="text-gray-400 leading-relaxed">{methodology.text}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}