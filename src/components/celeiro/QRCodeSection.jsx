import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";

export default function QRCodeSection() {
  const [qrCode, setQrCode] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function generateQR() {
      try {
        const url = window.location.origin;
        const qr = await QRCode.toDataURL(url, {
          errorCorrectionLevel: 'H',
          type: 'image/webp',
          quality: 0.95,
          margin: 1,
          width: 300,
          color: {
            dark: '#FFFFFF',
            light: '#0a0a0a'
          }
        });
        setQrCode(qr);
      } catch (error) {
        console.error('Erro ao gerar QR code:', error);
      }
    }
    generateQR();
  }, []);

  const downloadQR = async (format = 'png') => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `celeiro-digital-qr.${format}`;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrCode) return;
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      };
      img.src = qrCode;
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  return (
    <section className="py-16 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#39FF14]/10 to-[#00E5FF]/10 border border-white/10 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Acesse Celeiro Digital</h3>
          <p className="text-gray-400 mb-8">Escaneie o QR code com sua câmera ou app de QR code</p>

          {qrCode && (
            <div className="mb-8 flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="bg-white p-4 rounded-xl"
              >
                <img src={qrCode} alt="QR Code Celeiro Digital" className="w-64 h-64" />
              </motion.div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => downloadQR('png')}
              className="bg-[#39FF14]/20 border border-[#39FF14]/50 text-[#39FF14] hover:bg-[#39FF14]/30 gap-2"
            >
              <Download className="w-4 h-4" />
              Baixar PNG
            </Button>

            <Button
              onClick={copyToClipboard}
              className="bg-[#00E5FF]/20 border border-[#00E5FF]/50 text-[#00E5FF] hover:bg-[#00E5FF]/30 gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar para Área de Transferência'}
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Versão {Math.floor(Date.now() / 1000)} • Sempre atualizado automaticamente
          </p>
        </motion.div>
      </div>
    </section>
  );
}