import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPageUrl } from "../utils";
import { Sprout } from "lucide-react";
import AdminLogin from "../components/auth/AdminLogin";
import StudentLogin from "../components/auth/StudentLogin";

export default function AccessControl() {
  const [accessType, setAccessType] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('celeiro_admin_token');
    const studentToken = localStorage.getItem('celeiro_student_token');
    
    if (adminToken || studentToken) {
      window.location.replace(createPageUrl('Home'));
    }
    setIsReady(true);
  }, []);

  const handleAdminSuccess = () => {
    window.location.replace(createPageUrl('Admin'));
  };

  const handleStudentSuccess = () => {
    window.location.replace(createPageUrl('Home'));
  };

  if (!isReady) return null;

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }} className="flex items-center justify-center p-4">
      <style>{`
        * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      {!accessType ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.02] border border-white/10 rounded-2xl max-w-md w-full p-6 sm:p-8 backdrop-blur-xl mt-20"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-[#39FF14]" />
              <span className="text-white font-bold text-lg sm:text-xl">
                Celeiro <span className="text-[#00E5FF]">Digital</span>
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Bem-vindo</h1>
            <p className="text-gray-400">Escolha como deseja acessar</p>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAccessType('admin')}
              className="w-full p-4 rounded-xl border-2 border-[#39FF14]/50 bg-[#39FF14]/5 hover:bg-[#39FF14]/10 transition-all duration-300"
            >
              <div className="text-left">
                <p className="text-[#39FF14] font-semibold">Acesso Admin</p>
                <p className="text-gray-400 text-sm">Apenas para administradores autorizados</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAccessType('student')}
              className="w-full p-4 rounded-xl border-2 border-[#00E5FF]/50 bg-[#00E5FF]/5 hover:bg-[#00E5FF]/10 transition-all duration-300"
            >
              <div className="text-left">
                <p className="text-[#00E5FF] font-semibold">Acesso Aluno</p>
                <p className="text-gray-400 text-sm">Para alunos matriculados</p>
              </div>
            </motion.button>

            <button
              onClick={() => window.history.back()}
              className="w-full p-4 rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-left">
                <p className="text-white font-semibold">Visitante</p>
                <p className="text-gray-400 text-sm">Explorar sem fazer login</p>
              </div>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-center mb-4 text-sm">
              Gostaria de colocar um Celeiro Digital na sua cidade?
            </p>
            <div className="flex gap-2 justify-center">
              <a
                href="mailto:celeirodigitalpf@gmail.com"
                className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold hover:opacity-90 transition-all duration-300"
              >
                Enviar Email
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('celeirodigitalpf@gmail.com');
                  alert('Email copiado!');
                }}
                className="px-4 py-2 text-sm rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              >
                Copiar Email
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Acesso seguro ao portal do Celeiro Digital
          </p>
          </motion.div>
          ) : (
          <div className="w-full">{/* Botão voltar */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setAccessType(null)}
            className="absolute top-24 left-6 sm:left-8 flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Voltar</span>
          </motion.button>
        <AnimatePresence>
          {accessType === 'admin' && (
            <AdminLogin onSuccess={handleAdminSuccess} />
          )}
          {accessType === 'student' && (
            <StudentLogin onSuccess={handleStudentSuccess} />
          )}
        </AnimatePresence>
         </div>
        )}
        </div>
        );
        }