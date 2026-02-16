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
    // Verificar se já está logado
    const adminToken = localStorage.getItem('celeiro_admin_token');
    const studentToken = localStorage.getItem('celeiro_student_token');
    
    if (adminToken || studentToken) {
      window.location.href = createPageUrl('Home');
    }
    setIsReady(true);
  }, []);

  const handleAdminSuccess = () => {
    window.location.href = createPageUrl('Admin');
  };

  const handleStudentSuccess = () => {
    window.location.href = createPageUrl('Home');
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
          className="bg-white/[0.02] border border-white/10 rounded-2xl max-w-md w-full p-6 sm:p-8 backdrop-blur-xl"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sprout className="w-8 h-8 text-[#39FF14]" />
              <span className="text-white font-bold text-xl">
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
                <p className="text-gray-400 text-sm">Para administradores</p>
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = createPageUrl('Home')}
              className="w-full p-4 rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-left">
                <p className="text-white font-semibold">Visitante</p>
                <p className="text-gray-400 text-sm">Explorar sem fazer login</p>
              </div>
            </motion.button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-8">
            Acesso seguro ao portal do Celeiro Digital
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {accessType === 'admin' && (
            <AdminLogin onSuccess={handleAdminSuccess} />
          )}
          {accessType === 'student' && (
            <StudentLogin onSuccess={handleStudentSuccess} />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}