import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Sprout, Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const navLinks = [
  { label: "Início", href: "#" },
  { label: "Sobre", href: "#sobre" },
  { label: "Ambientes", href: "#ambientes" },
  { label: "Escola", href: "#escola" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Horários", href: "#horarios" },
  { label: "Planos", href: "#planos" },
  { label: "Agência", href: "#agencia" },
  { label: "Contato", href: "#contato" },
];

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    async function checkAdmin() {
      try {
        const user = await base44.auth.me();
        setIsAdmin(user?.role === 'admin');
      } catch (error) {
        setIsAdmin(false);
      }
    }
    checkAdmin();
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <style>{`
        * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #333; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(57,255,20,0.3); color: #fff; }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => handleNavClick("#")}
            className="flex items-center gap-2 group"
          >
            <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white font-bold text-base sm:text-lg tracking-tight">
              Celeiro
              <span className="text-[#00E5FF]"> Digital</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            {isAdmin && (
            <a href={createPageUrl('Admin')} className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#39FF14]/10 to-[#00E5FF]/10 border border-[#39FF14]/30 text-[#39FF14] hover:border-[#39FF14]/50 transition-all duration-300">
              <Shield className="w-4 h-4" />
              Admin
            </a>
          )}
            <a href={createPageUrl('AccessControl')} className="px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
              Acesso
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                  >
                    {link.label}
                  </button>
                ))}
                {isAdmin && (
                  <a href={createPageUrl('Admin')} className="flex items-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#39FF14]/10 to-[#00E5FF]/10 border border-[#39FF14]/30 text-[#39FF14]">
                    <Shield className="w-4 h-4" />
                    Admin
                  </a>
                )}
                <a href={createPageUrl('AccessControl')} className="w-full block px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                  Acesso
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {children}
    </div>
  );
}