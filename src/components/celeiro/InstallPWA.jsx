import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Chrome, Smartphone, Apple } from "lucide-react";

export default function InstallPWA({ onClose }) {
  const [activeTab, setActiveTab] = useState("desktop");

  const instructions = {
    desktop: {
      title: "Computador",
      icon: Chrome,
      steps: [
        "Abra o navegador Chrome, Edge ou Firefox",
        "Clique no ícone 'Instalar' na barra de endereço (canto superior direito)",
        "Clique em 'Instalar' na janela que aparecer",
        "O app será adicionado à sua tela inicial e menu de aplicativos"
      ]
    },
    android: {
      title: "Android",
      icon: Smartphone,
      steps: [
        "Abra o Celeiro Digital em seu navegador Chrome ou Firefox",
        "Toque o menu (3 pontos) no canto superior direito",
        "Selecione 'Instalar app' ou 'Adicionar à tela inicial'",
        "Confirme e o app aparecerá na sua tela inicial",
        "Acesse de forma rápida, como qualquer outro aplicativo"
      ]
    },
    iphone: {
      title: "iPhone/iPad (iOS)",
      icon: Apple,
      steps: [
        "Abra o Celeiro Digital em seu navegador Safari",
        "Toque o ícone 'Compartilhar' (seta para cima) na barra inferior",
        "Role para cima e selecione 'Adicionar à Tela inicial'",
        "Personalize o nome (se desejar) e toque 'Adicionar'",
        "O app estará acessível como um ícone na sua tela inicial"
      ]
    }
  };

  const tabs = ["desktop", "android", "iphone"];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0a0a0a] border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Instalar Celeiro Digital</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex gap-3 mb-8 flex-wrap">
              {tabs.map((tab) => {
                const config = instructions[tab];
                const Icon = config.icon;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab
                        ? "bg-[#39FF14] text-black font-semibold"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {config.title}
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="space-y-4">
                {instructions[activeTab].steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#39FF14] flex items-center justify-center text-black font-bold text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-gray-300 pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-lg bg-[#39FF14]/5 border border-[#39FF14]/30">
                <p className="text-sm text-gray-300">
                  <strong className="text-[#39FF14]">Dica:</strong> Ao instalar, você poderá usar o Celeiro Digital como um app nativo com acesso rápido, mesmo sem conexão com a internet (recursos previamente carregados).
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}