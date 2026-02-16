import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Edit2, Save, Plus, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const defaultPlans = [
  {
    plan_name: "Básico",
    price: 0,
    features: ["Acesso aos cursos", "Certificados", "Suporte por email"]
  },
  {
    plan_name: "Profissional",
    price: 0,
    features: ["Tudo do Básico", "Mentorias individuais", "Acesso a materiais premium", "Suporte prioritário"]
  },
  {
    plan_name: "Completo",
    price: 0,
    features: ["Tudo do Profissional", "Workshops exclusivos", "Assessoria pessoal", "Acesso vitalício"]
  }
];

export default function SubscriptionPlans() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    async function checkAdmin() {
      try {
        const user = await base44.auth.me();
        setIsAdmin(user?.role === 'admin');
      } catch {
        setIsAdmin(false);
      }
    }
    checkAdmin();
  }, []);

  const { data: plans } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const items = await base44.entities.Subscription.list();
      if (items.length === 0) {
        await Promise.all(defaultPlans.map(plan => base44.entities.Subscription.create(plan)));
        return await base44.entities.Subscription.list();
      }
      return items;
    },
    initialData: [],
  });

  const handleSave = async () => {
    try {
      await Promise.all(
        Object.entries(editData).map(([id, data]) =>
          base44.entities.Subscription.update(id, data)
        )
      );
      setEditMode(false);
      setEditData({});
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    } catch (error) {
      alert("Erro ao salvar alterações");
    }
  };

  return (
    <section className="py-20 px-6 bg-white/[0.02]" id="assinaturas">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Planos de Matrícula</h2>
          <p className="text-gray-400">Escolha o plano que melhor se adequa às suas necessidades</p>
          {isAdmin && (
            <button
              onClick={() => {
                if (editMode) handleSave();
                else setEditMode(!editMode);
              }}
              className="mt-6 px-4 py-2 rounded-lg bg-[#39FF14]/20 text-[#39FF14] hover:bg-[#39FF14]/30 transition-colors inline-flex items-center gap-2"
            >
              {editMode ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {editMode ? "Salvar" : "Editar Planos"}
            </button>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`bg-gradient-to-b border-2 h-full flex flex-col transition-all ${
                idx === 1 
                  ? 'from-[#39FF14]/20 to-[#00E5FF]/10 border-[#39FF14]/50 scale-105'
                  : 'from-white/5 to-white/0 border-white/10'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${idx === 1 ? 'text-[#39FF14]' : 'text-white'}`}>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData[plan.id]?.plan_name || plan.plan_name}
                        onChange={(e) =>
                          setEditData(prev => ({
                            ...prev,
                            [plan.id]: { ...prev[plan.id], plan_name: e.target.value }
                          }))
                        }
                        className="w-full bg-white/10 text-white px-2 py-1 rounded"
                      />
                    ) : (
                      plan.plan_name
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col gap-6">
                  <div>
                    {editMode ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">R$</span>
                        <input
                          type="number"
                          value={editData[plan.id]?.price ?? plan.price}
                          onChange={(e) =>
                            setEditData(prev => ({
                              ...prev,
                              [plan.id]: { ...prev[plan.id], price: parseFloat(e.target.value) }
                            }))
                          }
                          className="flex-1 bg-white/10 text-white px-2 py-1 rounded"
                        />
                        <span className="text-gray-400">/mês</span>
                      </div>
                    ) : (
                      <p className="text-3xl font-bold text-white">
                        R$ <span className={idx === 1 ? 'text-[#39FF14]' : ''}>{plan.price}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 flex-1">
                    {editMode ? (
                      <div className="space-y-2">
                        {(editData[plan.id]?.features || plan.features).map((feature, i) => (
                          <input
                            key={i}
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const features = [...(editData[plan.id]?.features || plan.features)];
                              features[i] = e.target.value;
                              setEditData(prev => ({
                                ...prev,
                                [plan.id]: { ...prev[plan.id], features }
                              }));
                            }}
                            className="w-full bg-white/10 text-white px-2 py-1 rounded text-sm"
                          />
                        ))}
                        <button
                          onClick={() => {
                            const features = [...(editData[plan.id]?.features || plan.features), ""];
                            setEditData(prev => ({
                              ...prev,
                              [plan.id]: { ...prev[plan.id], features }
                            }));
                          }}
                          className="w-full p-2 rounded border border-white/20 text-white hover:bg-white/5 flex items-center justify-center gap-2 text-sm"
                        >
                          <Plus className="w-3 h-3" />
                          Adicionar feature
                        </button>
                      </div>
                    ) : (
                      plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#39FF14] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))
                    )}
                  </div>

                  <Button
                    className={`w-full ${
                      idx === 1
                        ? 'bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black hover:opacity-90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {editMode ? 'Editar Plano' : 'Escolher Plano'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}