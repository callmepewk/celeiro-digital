import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Copy, Plus } from "lucide-react";

export default function StudentManager() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const items = await base44.entities.Student.list('-created_date');
      return items;
    },
    initialData: [],
  });

  const generateEnrollmentNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `MAT${year}${random}`;
  };

  const handleSubmit = async () => {
    if (!formData.full_name || !formData.email || !formData.phone || !formData.password) {
      alert("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const enrollmentNumber = generateEnrollmentNumber();
      
      await base44.entities.Student.create({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        enrollment_number: enrollmentNumber,
        enrollment_date: new Date().toISOString(),
        is_active: true
      });

      queryClient.invalidateQueries({ queryKey: ['students'] });
      setFormData({ full_name: "", email: "", phone: "", password: "" });
      alert(`Aluno cadastrado! Matrícula: ${enrollmentNumber}`);
    } catch (error) {
      alert("Erro ao cadastrar aluno");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return;
    try {
      await base44.entities.Student.delete(id);
      queryClient.invalidateQueries({ queryKey: ['students'] });
    } catch (error) {
      alert("Erro ao deletar aluno");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Cadastrar Novo Aluno</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Nome Completo *</label>
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="Nome do aluno"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Telefone *</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Senha Inicial *</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="Senha de acesso"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#39FF14]/5 border border-[#39FF14]/30 text-sm text-gray-300">
            <strong className="text-[#39FF14]">Número de Matrícula:</strong> Será gerado automaticamente no formato MAT{new Date().getFullYear()}XXXXX
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#39FF14] text-black hover:bg-[#39FF14]/90 font-semibold gap-2"
          >
            <Plus className="w-4 h-4" />
            {loading ? "Cadastrando..." : "Cadastrar Aluno"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-white font-semibold">Alunos Cadastrados ({students.length})</h3>
        {students.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum aluno cadastrado ainda</p>
        ) : (
          students.map((student) => (
            <Card key={student.id} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold">{student.full_name}</p>
                    <p className="text-gray-400 text-sm">{student.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-[#39FF14] font-mono text-sm">{student.enrollment_number}</p>
                      <button
                        onClick={() => copyToClipboard(student.enrollment_number)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="Copiar matrícula"
                      >
                        <Copy className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}