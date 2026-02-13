import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, Loader2, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });
    
    try {
      await base44.functions.invoke('sendContactEmail', formData);
      setStatus({ loading: false, success: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus({ loading: false, success: false, error: "" }), 3000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: "Erro ao enviar mensagem" });
    }
  };

  return (
    <section id="contato" className="py-24 px-6 relative">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[180px] opacity-5"
        style={{ background: "radial-gradient(circle, #39FF14, transparent)" }}
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
            Contato
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Fale Conosco
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Quer saber mais? Entre em contato e venha fazer parte dessa revolução
            digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {[
              {
                icon: MapPin,
                title: "Endereço",
                text: "Porto Firme, Minas Gerais",
                color: "#39FF14",
              },
              {
                icon: Mail,
                title: "E-mail",
                text: "pedro_hbfreitas@hotmail.com",
                color: "#00E5FF",
              },
              {
                icon: Phone,
                title: "Telefones",
                text: "(54) 99155-4136 / (21) 98034-3873",
                color: "#39FF14",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.color}12` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className="text-white font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#39FF14]/50 transition-colors duration-300"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#39FF14]/50 transition-colors duration-300"
            />
            <textarea
              rows={4}
              placeholder="Sua mensagem"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#39FF14]/50 transition-colors duration-300 resize-none"
            />
            {status.error && (
              <p className="text-red-400 text-sm">{status.error}</p>
            )}
            {status.success && (
              <div className="flex items-center gap-2 text-[#39FF14] text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Mensagem enviada com sucesso!</span>
              </div>
            )}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-black transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #39FF14, #00E5FF)" }}
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}