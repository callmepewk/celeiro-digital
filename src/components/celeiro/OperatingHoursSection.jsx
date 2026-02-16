import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Clock, MapPin, Edit2, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const daysOfWeek = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

export default function OperatingHoursSection() {
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

  const { data: hours } = useQuery({
    queryKey: ['operatingHours'],
    queryFn: async () => {
      const items = await base44.entities.OperatingHours.list();
      if (items.length === 0) {
        // Criar padrão
        await Promise.all(
          daysOfWeek.slice(0, 5).map(day =>
            base44.entities.OperatingHours.create({
              day_of_week: day,
              opening_time: "08:00",
              closing_time: "18:00",
              is_closed: false
            })
          )
        );
        await Promise.all(
          daysOfWeek.slice(5).map(day =>
            base44.entities.OperatingHours.create({
              day_of_week: day,
              is_closed: true
            })
          )
        );
        return await base44.entities.OperatingHours.list();
      }
      return items;
    },
    initialData: [],
  });

  const handleSave = async () => {
    try {
      await Promise.all(
        Object.entries(editData).map(([id, data]) =>
          base44.entities.OperatingHours.update(id, data)
        )
      );
      setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['operatingHours'] });
    } catch (error) {
      alert("Erro ao salvar alterações");
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-white/[0.02]" id="horarios">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Nosso Funcionamento</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Metodologia inovadora que transforma conhecimento em resultados. Confira nossos horários e como trabalhamos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.05] border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Metodologia</h3>
            <ul className="space-y-4">
              {[
                "Diagnóstico detalhado das necessidades",
                "Planejamento estratégico personalizado",
                "Implementação com suporte contínuo",
                "Acompanhamento e otimização permanente",
                "Resultados mensuráveis e transparentes"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14] flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Horários de Atendimento</h3>
              {isAdmin && (
                <button
                  onClick={() => {
                    if (editMode) handleSave();
                    else setEditMode(!editMode);
                  }}
                  className="p-2 rounded-lg bg-[#39FF14]/20 text-[#39FF14] hover:bg-[#39FF14]/30 transition-colors"
                >
                  {editMode ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                </button>
              )}
            </div>

            <div className="space-y-3">
              {daysOfWeek.map((day) => {
                const schedule = hours.find(h => h.day_of_week === day);
                return (
                  <div key={day} className="bg-white/[0.05] border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold capitalize">{day}</span>
                      {editMode && schedule ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="time"
                            value={editData[schedule.id]?.opening_time || schedule.opening_time || ""}
                            onChange={(e) =>
                              setEditData(prev => ({
                                ...prev,
                                [schedule.id]: { ...prev[schedule.id], opening_time: e.target.value }
                              }))
                            }
                            disabled={editData[schedule.id]?.is_closed}
                            className="px-2 py-1 rounded bg-white/10 text-white text-sm"
                          />
                          <span className="text-gray-400">-</span>
                          <input
                            type="time"
                            value={editData[schedule.id]?.closing_time || schedule.closing_time || ""}
                            onChange={(e) =>
                              setEditData(prev => ({
                                ...prev,
                                [schedule.id]: { ...prev[schedule.id], closing_time: e.target.value }
                              }))
                            }
                            disabled={editData[schedule.id]?.is_closed}
                            className="px-2 py-1 rounded bg-white/10 text-white text-sm"
                          />
                          <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editData[schedule.id]?.is_closed ?? schedule.is_closed}
                              onChange={(e) =>
                                setEditData(prev => ({
                                  ...prev,
                                  [schedule.id]: { ...prev[schedule.id], is_closed: e.target.checked }
                                }))
                              }
                              className="w-3 h-3"
                            />
                            Fechado
                          </label>
                        </div>
                      ) : (
                        <span className={schedule?.is_closed ? "text-red-400" : "text-[#39FF14]"}>
                          {schedule?.is_closed ? "Fechado" : `${schedule?.opening_time} - ${schedule?.closing_time}`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}