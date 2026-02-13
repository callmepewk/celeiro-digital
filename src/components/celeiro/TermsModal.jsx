import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsModal({ onAccept }) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = (e) => {
    const element = e.target;
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
    if (isAtBottom) {
      setScrolledToBottom(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a] border border-white/20 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">Termos e Condições de Uso</h2>
          <p className="text-gray-400 text-sm">Por favor, leia atentamente antes de continuar</p>
        </div>

        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-300 text-sm leading-relaxed"
        >
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">1. Aceitação dos Termos</h3>
            <p>Ao acessar e utilizar o site do Celeiro Digital, você concorda com estes Termos e Condições de Uso, nossa Política de Privacidade e todas as leis e regulamentos aplicáveis, incluindo a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">2. Proteção de Dados Pessoais (LGPD)</h3>
            <p className="mb-2">Em conformidade com a LGPD, informamos que:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Coletamos dados pessoais (nome, email, telefone) para fins educacionais e de contato</li>
              <li>Seus dados são armazenados de forma segura e não serão compartilhados com terceiros sem seu consentimento</li>
              <li>Você possui os direitos de acesso, correção, exclusão, portabilidade e revogação do consentimento</li>
              <li>Para exercer seus direitos, entre em contato através do email: pedro_hbfreitas@hotmail.com</li>
              <li>O responsável pelo tratamento dos dados é: Pedro Henrique Brezolin de Freitas</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">3. Direitos Educacionais (UNESCO)</h3>
            <p className="mb-2">Em alinhamento com os princípios da UNESCO para educação digital:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Garantimos acesso inclusivo e equitativo à educação digital</li>
              <li>Promovemos a alfabetização digital para todas as idades</li>
              <li>Respeitamos a diversidade cultural e a liberdade de expressão</li>
              <li>Comprometemo-nos com a qualidade educacional e formação continuada</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">4. Uso do Site e Conteúdo</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>O conteúdo deste site é protegido por direitos autorais e propriedade intelectual</li>
              <li>É proibido reproduzir, distribuir ou modificar materiais sem autorização expressa</li>
              <li>Você se compromete a utilizar o site de forma legal e ética</li>
              <li>Reservamo-nos o direito de modificar ou descontinuar serviços sem aviso prévio</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">5. Cookies e Tecnologias de Rastreamento</h3>
            <p>Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego e personalizar conteúdo. Ao continuar navegando, você consente com o uso dessas tecnologias.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">6. Limitação de Responsabilidade</h3>
            <p>O Celeiro Digital não se responsabiliza por danos diretos ou indiretos resultantes do uso deste site, incluindo perda de dados, interrupção de negócios ou outros prejuízos.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">7. Modificações dos Termos</h3>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações entrarão em vigor imediatamente após a publicação no site.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">8. Lei Aplicável e Foro</h3>
            <p>Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca de Porto Firme - MG.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">9. Contato</h3>
            <p>Para dúvidas sobre estes termos ou para exercer seus direitos sob a LGPD:</p>
            <p className="mt-2">Email: pedro_hbfreitas@hotmail.com</p>
            <p>Telefones: (54) 99155-4136 / (21) 98034-3873</p>
          </section>

          <div className="mt-8 p-4 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30">
            <p className="text-[#39FF14] font-semibold mb-2">Consentimento Livre e Informado</p>
            <p className="text-gray-300">Ao aceitar estes termos, você declara que foi informado de forma clara e transparente sobre o tratamento de seus dados pessoais e consente livremente com sua coleta, armazenamento e processamento para as finalidades descritas.</p>
          </div>
        </div>

        <div className="p-6 border-t border-white/10">
          {!scrolledToBottom ? (
            <div className="flex items-center justify-center gap-2 text-amber-500 mb-4">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Role até o final para aceitar os termos</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-[#39FF14] mb-4">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Você leu todos os termos</p>
            </div>
          )}
          <Button
            onClick={onAccept}
            disabled={!scrolledToBottom}
            className="w-full bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold text-base py-6 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Li e Aceito os Termos e Condições
          </Button>
        </div>
      </motion.div>
    </div>
  );
}