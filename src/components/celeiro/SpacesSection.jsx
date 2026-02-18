import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, BookOpen, Users, Video, Palette, MessageCircle } from "lucide-react";

const spaces = [
  {
    id: "cybercafe",
    icon: Wifi,
    name: "Cibercafé",
    tagline: "Conexão sem fronteiras",
    description:
      "Estações equipadas com internet de alta velocidade para navegação, trabalho remoto e estudos. O ponto de partida para a inclusão digital.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    color: "#39FF14",
  },
  {
    id: "classroom",
    icon: BookOpen,
    name: "Sala de Aula",
    tagline: "Onde o conhecimento acontece",
    description:
      "Ambiente climatizado com projetor, computadores individuais e infraestrutura completa para aulas presenciais e híbridas.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    color: "#00E5FF",
  },
  {
    id: "meeting",
    icon: Users,
    name: "Sala de Reunião",
    tagline: "Colaboração de alto nível",
    description:
      "Espaço profissional para reuniões, mentorias e sessões de brainstorming. Ideal para empreendedores e equipes locais.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    color: "#39FF14",
  },
  {
    id: "studio",
    icon: Video,
    name: "Estúdio de Vídeo & Podcast",
    tagline: "Produza conteúdo profissional",
    description:
      "Equipamento profissional de gravação, iluminação e edição para criação de conteúdo digital, podcasts e lives.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    color: "#00E5FF",
  },
  {
    id: "makeup",
    icon: Palette,
    name: "Sala de Maquiagem & Gravação",
    tagline: "Prepare-se para brilhar",
    description:
      "Sala de preparação com espelhos, iluminação profissional e equipamentos para gravações que exigem produção visual.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    color: "#39FF14",
  },
];

export default function SpacesSection() {
  const [active, setActive] = useState(0);
  const current = spaces[active];

  return (
    <section id="ambientes" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#39FF14] text-sm font-semibold tracking-widest uppercase">
            Infraestrutura
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Nossos Ambientes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Espaços pensados para oferecer a melhor experiência de aprendizado e
            criação.
          </p>
        </motion.div>

        {/* Rental CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12 bg-gradient-to-r from-[#39FF14]/10 to-[#00E5FF]/10 border border-[#39FF14]/30 rounded-2xl p-6 sm:p-8"
        >
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Gostaria de alugar um dos nossos espaços para uso pessoal?
            </h3>
            <p className="text-gray-300 mb-6">
              Entre em contato e reserve o ambiente ideal para suas necessidades
            </p>
            <a
              href="https://wa.me/5521980343873?text=Olá!%20Gostaria%20de%20reservar%20um%20espaço%20no%20Celeiro%20Digital."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-[#39FF14] to-[#00E5FF] hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {spaces.map((space, i) => (
            <button
              key={space.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === i
                  ? "text-black"
                  : "text-gray-400 border border-white/10 hover:border-white/20 bg-white/[0.03]"
              }`}
              style={
                active === i
                  ? { background: `linear-gradient(135deg, ${space.color}, ${space.color}CC)` }
                  : {}
              }
            >
              <space.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{space.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${current.color}20, transparent 60%)`,
                }}
              />
            </div>
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
                style={{
                  color: current.color,
                  backgroundColor: `${current.color}15`,
                  border: `1px solid ${current.color}30`,
                }}
              >
                <current.icon className="w-3.5 h-3.5" />
                {current.tagline}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {current.name}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {current.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}