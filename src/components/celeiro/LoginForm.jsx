import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const leads = await base44.entities.Lead.filter({ email: formData.email });
      
      if (leads.length > 0) {
        localStorage.setItem('celeiro_user_email', formData.email);
        localStorage.setItem('celeiro_lead_submitted', 'true');
        onSuccess();
      } else {
        setError('Email não encontrado. Cadastre-se primeiro.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a] border border-white/20 rounded-2xl max-w-md w-full p-4 sm:p-8"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-r from-[#39FF14] to-[#00E5FF] flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Lock className="w-6 sm:w-8 h-6 sm:h-8 text-black" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Bem-vindo de Volta</h2>
          <p className="text-sm sm:text-base text-gray-400">Entre com seu email para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-white/[0.04] border-white/10 text-white"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Senha</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold text-sm sm:text-base py-4 sm:py-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Seus dados estão protegidos pela LGPD
        </p>
      </motion.div>
    </div>
  );
}