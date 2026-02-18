import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Search, ChevronRight, Sparkles } from "lucide-react";

export default function EscolaSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const user = await base44.auth.me();
        setIsAdmin(user?.role === 'admin');
      } catch {
        setIsAdmin(false);
      }
    }
    checkAdmin();
  }, []);

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.filter({ is_active: true }),
    initialData: [],
  });

  const categories = ['all', ...new Set(courses.map(c => c.category).filter(Boolean))];
  
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  return (
    <section id="escola" className="py-20 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 mb-6">
            <Sparkles className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] text-sm font-semibold">Primeira Escola de Educação Digital de Porto Firme</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Nossa Escola</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-6 leading-relaxed">
            Trabalhamos de forma <span className="text-[#39FF14] font-semibold">híbrida</span>, combinando o melhor do ensino presencial e online para levar educação digital de qualidade para nossa comunidade.
          </p>
          
          <div className="max-w-3xl mx-auto space-y-6 text-left bg-white/[0.02] border border-white/10 rounded-2xl p-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#39FF14]" />
                Nossos Setores
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                  <h4 className="font-semibold text-[#39FF14] mb-2">💻 Tecnologia</h4>
                  <p className="text-sm">Desenvolvimento web, programação, design digital, automação e muito mais.</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                  <h4 className="font-semibold text-[#00E5FF] mb-2">📱 Marketing</h4>
                  <p className="text-sm">Marketing digital, gestão de redes sociais, tráfego pago e estratégias de vendas online.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Para quem são os cursos?</h3>
              <p className="text-gray-300 leading-relaxed">
                Nossos cursos são para <span className="text-white font-semibold">todas as faixas etárias</span>! 
                Desde jovens em busca de qualificação profissional até <span className="text-[#39FF14] font-bold bg-[#39FF14]/10 px-2 py-1 rounded">cursos de alfabetização digital especialmente desenvolvidos para adultos e idosos</span>, 
                garantindo que ninguém fique de fora da revolução digital.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#39FF14] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white/[0.05] border border-white/10 rounded-xl overflow-hidden hover:border-[#39FF14]/50 transition-all duration-300"
              >
                {course.image_url && (
                  <div className="h-40 overflow-hidden bg-gradient-to-br from-[#39FF14]/10 to-[#00E5FF]/10">
                    <img
                      src={course.image_url}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#39FF14]/10 text-[#39FF14]">
                      {course.type}
                    </span>
                    {course.is_pinned && <Sparkles className="w-4 h-4 text-[#39FF14]" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{course.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center text-[#39FF14] text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                    Saiba mais <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}