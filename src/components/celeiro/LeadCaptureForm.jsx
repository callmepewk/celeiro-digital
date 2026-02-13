import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function LeadCaptureForm({ onComplete }) {
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await base44.entities.Lead.create({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        accepted_terms: true,
        accepted_at: new Date().toISOString(),
      });

      localStorage.setItem('celeiro_lead_submitted', 'true');
      localStorage.setItem('celeiro_user_email', formData.email);
      onComplete();
    } catch (err) {
      setError('Erro ao salvar seus dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a] border border-white/20 rounded-2xl max-w-md w-full p-4 sm:p-8 max-h-[95vh] overflow-y-auto"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-r from-[#39FF14] to-[#00E5FF] flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Lock className="w-6 sm:w-8 h-6 sm:h-8 text-black" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {isReturningUser ? 'Bem-vindo de Volta' : 'Bem-vindo ao Celeiro Digital'}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            {isReturningUser ? 'Digite seu email para acessar' : 'Preencha seus dados para continuar navegando'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Nome Completo *</label>
            <Input
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
              className="bg-white/[0.04] border-white/10 text-white"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Email *</label>
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
            <label className="text-gray-400 text-sm mb-2 block">Telefone *</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-white/[0.04] border-white/10 text-white"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Senha *</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                className="bg-white/[0.04] border-white/10 text-white pr-10"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Sua senha não será armazenada publicamente</p>
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
                Processando...
              </>
            ) : (
              'Continuar para o Site'
            )}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Seus dados estão protegidos pela LGPD e serão utilizados apenas para fins educacionais
        </p>
      </motion.div>
    </div>
  );
}