import React from "react";
import { motion } from "framer-motion";
import { Sprout, Megaphone, Linkedin, Instagram } from "lucide-react";

const teachers = [
  {
    name: "Jauru Nunes de Freitas",
    role: "Fundador & Educador",
    description:
      "Médico dermatologista formado pela UFRGS e Università La Sapienza de Roma. Idealizador do Celeiro Digital, lidera a missão de democratizar a educação digital em Porto Firme.",
    icon: Sprout,
    color: "#39FF14",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e9132814b2809b199a498/d2d5b4702_image.png",
  },
  {
    name: "Pedro Henrique Brezolin de Freitas",
    role: "CTO & Especialista em Tecnologia",
    description:
      "Graduando em Engenharia de Software e Engenharia Genética. Computer Science for Business Professionals (Harvard), Gestor de Tráfego Pago (Pedro Sobral) e Neurociência (IFSC). Transforma tecnologia em soluções educacionais.",
    icon: Megaphone,
    color: "#00E5FF",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698e9132814b2809b199a498/ccb685b6e_image.png",
  },
];

export default function TeachersSection() {
  return (
    <section id="professores" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#39FF14] text-sm font-semibold tracking-widest uppercase">
            Equipe
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Nossos Professores
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Profissionais dedicados a transformar vidas através da educação
            digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teachers.map((teacher, i) => (
            <motion.div
              key={teacher.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${teacher.color}08, transparent 60%)`,
                }}
              />
              <div className="relative z-10 p-8">
                <div className="flex items-start gap-5">
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-offset-2 ring-offset-[#0a0a0a]"
                      style={{ ringColor: `${teacher.color}40` }}
                    >
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: teacher.color }}
                    >
                      <teacher.icon className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white">{teacher.name}</h3>
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: teacher.color }}
                    >
                      {teacher.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 mt-5 leading-relaxed text-sm">
                  {teacher.description}
                </p>
                <div className="flex gap-3 mt-5">
                  <button
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors duration-300"
                  >
                    <Instagram className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors duration-300"
                  >
                    <Linkedin className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}