import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sprout, LogIn } from "lucide-react";
import InstallPWA from "./InstallPWA";
import { createPageUrl } from "../../utils";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [showInstallPWA, setShowInstallPWA] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(57,255,20,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, #39FF14, transparent)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-20"
        style={{ background: "radial-gradient(circle, #00E5FF, transparent)" }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 mb-8">
            <Sprout className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] text-sm font-medium tracking-wider uppercase" id="hero-city-badge">
              Porto Firme — MG
            </span>
          </div>
          <script dangerouslySetInnerHTML={{__html: `
            const stored = localStorage.getItem('celeiro_city');
            if (stored) {
              const city = JSON.parse(stored);
              const badge = document.getElementById('hero-city-badge');
              if (badge) badge.textContent = city.name + ' — ' + city.state;
            }
          `}} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6"
        >
          <span className="text-white">Celeiro</span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #39FF14, #00E5FF)",
            }}
          >
            Digital
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2"
        >
          Alfabetização digital, formação tecnológica e geração de renda.
          <br className="hidden md:block" />
          Plantando sementes de conhecimento para colher um futuro digital.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#cursos"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-black overflow-hidden transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #39FF14, #00E5FF)" }}
          >
            <span className="relative z-10">Explorar Cursos</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <button
            onClick={() => setShowInstallPWA(true)}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white border border-white/20 hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all duration-300"
          >
            📱 Instalar App
          </button>
          <a
            href="#sobre"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white border border-white/20 hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all duration-300"
          >
            Conheça o Espaço
          </a>
          <Link
            to={createPageUrl('AccessControl')}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white border border-[#00E5FF]/40 hover:border-[#00E5FF]/80 hover:bg-[#00E5FF]/5 transition-all duration-300 flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Fazer Login</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </motion.div>

      {showInstallPWA && (
        <InstallPWA onClose={() => setShowInstallPWA(false)} />
      )}
    </section>
  );
}