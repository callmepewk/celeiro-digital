import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, BookOpen, Eye, EyeOff, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function StudentLogin({ onSuccess }) {
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const students = await base44.entities.Student.filter({ 
        enrollment_number: enrollmentNumber 
      });

      if (students.length === 0) {
        setError('Matrícula não encontrada.');
        setLoading(false);
        return;
      }

      const student = students[0];
      
      // Verificação simples de senha (em produção seria com hash)
      if (student.password === password && student.is_active) {
        localStorage.setItem('celeiro_student_token', 'true');
        localStorage.setItem('celeiro_student_enrollment', enrollmentNumber);
        localStorage.setItem('celeiro_student_name', student.full_name);
        onSuccess();
      } else {
        setError('Matrícula ou senha incorretas.');
      }
    } catch (err) {
      setError('Erro ao processar login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-2 sm:p-4">
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 px-3 py-2 text-gray-400 hover:text-white transition-colors"
      >
        ← Voltar
      </button>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a] border border-white/20 rounded-2xl max-w-md w-full p-4 sm:p-8"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-r from-[#39FF14] to-[#00E5FF] flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-black" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Acesso Aluno</h2>
          <p className="text-sm sm:text-base text-gray-400">Digite seu número de matrícula</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Número de Matrícula *</label>
            <Input
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value.toUpperCase())}
              required
              className="bg-white/[0.04] border-white/10 text-white"
              placeholder="EX: MAT202600001"
              maxLength={20}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Senha *</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/[0.04] border-white/10 text-white pr-10"
                placeholder="Sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold text-sm sm:text-base py-4 sm:py-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Acessando...
              </>
            ) : (
              'Entrar como Aluno'
            )}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Acesso restrito a alunos matriculados do Celeiro Digital
        </p>
      </motion.div>
    </div>
  );
}