import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Globe, MessageCircle, Database, Zap, Target, ChevronRight, Mail, Phone } from "lucide-react";

const services = [
  {
    id: 'traffic',
    category: 'marketing',
    title: 'Gestão de Tráfego Pago',
    description: 'Estratégias de publicidade digital otimizadas para máximo ROI em Google Ads e Meta Ads.',
    icon: TrendingUp,
    color: 'from-[#00E5FF] to-[#39FF14]',
    features: ['Google Ads', 'Facebook/Instagram Ads', 'Relatórios detalhados', 'Otimização contínua']
  },
  {
    id: 'websites',
    category: 'tech',
    title: 'Desenvolvimento de Sites e Web-Apps',
    description: 'Plataformas modernas, rápidas e responsivas que convertem visitantes em clientes.',
    icon: Globe,
    color: 'from-[#39FF14] to-[#00E5FF]',
    features: ['Design responsivo', 'SEO otimizado', 'Performance máxima', 'Segurança garantida']
  },
  {
    id: 'chatbots',
    category: 'tech',
    title: 'Criação de Chatbots IA',
    description: 'Assistentes inteligentes que automatizam atendimento 24/7 e aumentam conversões.',
    icon: MessageCircle,
    color: 'from-[#00E5FF] to-[#39FF14]',
    features: ['IA conversacional', 'Integração com sistemas', 'Análise de interações', 'Manutenção contínua']
  },
  {
    id: 'crm',
    category: 'tech',
    title: 'Desenvolvimento de CRM',
    description: 'Sistemas de gestão de relacionamento customizados para sua operação.',
    icon: Database,
    color: 'from-[#39FF14] to-[#00E5FF]',
    features: ['Automação de vendas', 'Gestão de clientes', 'Relatórios em tempo real', 'Escalabilidade']
  },
  {
    id: 'saas',
    category: 'tech',
    title: 'Desenvolvimento SAAS',
    description: 'Plataformas SaaS escaláveis e prontas para monetização.',
    icon: Zap,
    color: 'from-[#00E5FF] to-[#39FF14]',
    features: ['Infraestrutura cloud', 'Payment gateway integrado', 'Analytics avançado', 'Suporte 24/7']
  },
  {
    id: 'marketing',
    category: 'marketing',
    title: 'Marketing Digital Estratégico',
    description: 'Estratégias completas de marketing que geram resultados mensuráveis.',
    icon: Target,
    color: 'from-[#39FF14] to-[#00E5FF]',
    features: ['Consultoria estratégica', 'Mentoria de negócios', 'Plano de ação', 'Acompanhamento mensal']
  }
];

export default function AgencySection() {
  const [selectedService, setSelectedService] = useState(null);

  const getTechContact = () => ({
    name: 'Seu Nome',
    phone: '+55 (11) XXXXX-XXXX',
    whatsapp: 'https://wa.me/551100000000'
  });

  const getMarketingContact = () => ({
    name: 'Nome do Seu Pai',
    phone: '+55 (11) XXXXX-XXXX',
    whatsapp: 'https://wa.me/551100000000'
  });

  const getContactInfo = (category) => {
    return category === 'tech' ? getTechContact() : getMarketingContact();
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white/[0.02] to-transparent" id="agencia">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Serviços da Agência</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Soluções completas de tecnologia e marketing para transformar seu negócio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card
                  onClick={() => setSelectedService(service)}
                  className="bg-white/[0.05] border-white/10 cursor-pointer hover:border-white/30 transition-all group h-full"
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} p-0.5 mb-4 group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-[#0a0a0a] rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#39FF14]" />
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                    <div className="flex items-center text-[#39FF14] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      Saiba mais <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/20 rounded-2xl max-w-2xl w-full p-8"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${selectedService.color} p-0.5 mb-6`}>
                <div className="w-full h-full bg-[#0a0a0a] rounded-lg flex items-center justify-center">
                  <selectedService.icon className="w-8 h-8 text-[#39FF14]" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-3">{selectedService.title}</h3>
              <p className="text-gray-300 mb-6">{selectedService.description}</p>

              <div className="mb-8">
                <h4 className="text-white font-semibold mb-4">O que incluímos:</h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.05] border border-white/10 rounded-xl p-6 mb-6">
                <p className="text-gray-400 text-sm mb-4">
                  {selectedService.category === 'tech'
                    ? 'Entre em contato conosco para discutir seu projeto e receber um orçamento personalizado.'
                    : 'Vamos criar uma estratégia personalizada para seus objetivos de marketing.'}
                </p>

                <div className="space-y-3">
                  <a
                    href={`tel:${getContactInfo(selectedService.category).phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] hover:bg-[#39FF14]/20 transition-colors"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">{getContactInfo(selectedService.category).name}</p>
                      <p className="text-xs">{getContactInfo(selectedService.category).phone}</p>
                    </div>
                  </a>

                  <a
                    href={getContactInfo(selectedService.category).whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-semibold">Enviar mensagem WhatsApp</p>
                  </a>
                </div>
              </div>

              <Button
                onClick={() => setSelectedService(null)}
                className="w-full bg-white/10 hover:bg-white/20 text-white"
              >
                Fechar
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}