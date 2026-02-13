import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function LeadCaptureForm({ onComplete }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a] border border-white/20 rounded-2xl max-w-md w-full p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#39FF14] to-[#00E5FF] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo ao Celeiro Digital</h2>
          <p className="text-gray-400">Preencha seus dados para continuar navegando</p>
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
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="bg-white/[0.04] border-white/10 text-white"
              placeholder="Mínimo 6 caracteres"
            />
            <p className="text-xs text-gray-500 mt-1">Sua senha não será armazenada publicamente</p>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold text-base py-6"
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