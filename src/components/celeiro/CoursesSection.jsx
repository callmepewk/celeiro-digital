import React from "react";
import { motion } from "framer-motion";
import { Monitor, Shield, TrendingUp, Megaphone, Film, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

const defaultCourses = [
  {
    icon: Monitor,
    title: "Alfabetização Digital",
    audience: "Todas as idades",
    description:
      "Do básico do computador ao uso da internet, e-mails e redes sociais. Ideal para quem está começando no mundo digital.",
    color: "#39FF14",
    tag: "Fundamentos",
  },
  {
    icon: Shield,
    title: "Introdução à Cibersegurança",
    audience: "Iniciantes",
    description:
      "Proteja seus dados e dispositivos. Aprenda sobre senhas seguras, phishing, privacidade e boas práticas online.",
    color: "#00E5FF",
    tag: "Segurança",
  },
  {
    icon: TrendingUp,
    title: "Tráfego Pago",
    audience: "Empreendedores",
    description:
      "Domine anúncios no Google e Meta Ads. Aprenda a investir com estratégia e gerar resultados reais para seu negócio.",
    color: "#39FF14",
    tag: "Marketing",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    audience: "Todos os níveis",
    description:
      "Estratégias de conteúdo, funil de vendas, branding e presença digital para crescer online.",
    color: "#00E5FF",
    tag: "Marketing",
  },
  {
    icon: Film,
    title: "Produção de Conteúdo",
    audience: "Criadores",
    description:
      "Criação de vídeos, edição, roteiro e publicação. Tudo para você se tornar um produtor de conteúdo profissional.",
    color: "#39FF14",
    tag: "Criação",
  },
];

export default function CoursesSection() {
  const { data: dbCourses } = useQuery({
    queryKey: ['activeCourses'],
    queryFn: async () => {
      const courses = await base44.entities.Course.filter({ is_active: true });
      return courses;
    },
    initialData: [],
  });

  const allCourses = [
    ...defaultCourses,
    ...dbCourses.map(course => ({
      icon: course.type === 'video' ? Film : Monitor,
      title: course.name,
      audience: course.category || "Todos",
      description: course.description,
      color: course.type === 'video' ? "#00E5FF" : "#39FF14",
      tag: course.type,
      redirect_url: course.redirect_url,
      image: course.image_url
    }))
  ];

  return (
    <section id="cursos" className="py-24 px-6 relative">
      {/* Subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-5"
        style={{ background: "radial-gradient(circle, #00E5FF, transparent)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00E5FF] text-sm font-semibold tracking-widest uppercase">
            Formação
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Cursos & Trilhas
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Trilhas de aprendizado pensadas para transformar iniciantes em
            profissionais do digital.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-500 flex flex-col overflow-hidden cursor-pointer"
              onClick={() => course.redirect_url && window.open(course.redirect_url, '_blank')}
            >
              {course.image && (
                <div className="w-full aspect-video overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-7">
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 0%, ${course.color}06, transparent 60%)`,
                }}
              />
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${course.color}12` }}
                  >
                    <course.icon className="w-5 h-5" style={{ color: course.color }} />
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      color: course.color,
                      backgroundColor: `${course.color}10`,
                      border: `1px solid ${course.color}25`,
                    }}
                  >
                    {course.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{course.audience}</p>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {course.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300" style={{ color: course.color }}>
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4" />
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