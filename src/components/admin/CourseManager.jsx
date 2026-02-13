import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2, Trash2, ExternalLink } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";

export default function CourseManager({ courses }) {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "curso",
    category: "",
    redirect_url: ""
  });
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: imageResult } = await base44.functions.invoke('generateCourseImage', {
        name: formData.name,
        description: formData.description,
        type: formData.type
      });

      await base44.entities.Course.create({
        ...formData,
        image_url: imageResult.image_url,
        is_active: true
      });

      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setFormData({ name: "", description: "", type: "curso", category: "", redirect_url: "" });
      setIsAdding(false);
    } catch (error) {
      alert('Erro ao criar curso: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return;
    
    try {
      await base44.entities.Course.delete(id);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    } catch (error) {
      alert('Erro ao excluir curso: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Gerenciamento de Cursos</h3>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Curso
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-white/[0.02] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Novo Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Nome do Curso</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white/[0.04] border-white/10 text-white"
                  placeholder="Ex: Introdução ao Python"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Descrição</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="bg-white/[0.04] border-white/10 text-white"
                  placeholder="Descrição completa do curso..."
                  rows={4}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Tipo</label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="bg-white/[0.04] border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="curso">Curso</SelectItem>
                      <SelectItem value="trilha">Trilha</SelectItem>
                      <SelectItem value="minicurso">Minicurso</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Categoria</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-white/[0.04] border-white/10 text-white"
                    placeholder="Ex: Marketing, Tecnologia..."
                  />
                </div>
              </div>
              {formData.type === 'video' && (
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">URL de Redirecionamento</label>
                  <Input
                    value={formData.redirect_url}
                    onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })}
                    className="bg-white/[0.04] border-white/10 text-white"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              )}
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="border-white/10 text-white">
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading} className="bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Gerando imagem e criando...
                    </>
                  ) : (
                    'Criar Curso'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <Card key={course.id} className="bg-white/[0.02] border-white/10 overflow-hidden">
            {course.image_url && (
              <div className="aspect-video bg-white/5 overflow-hidden">
                <img src={course.image_url} alt={course.name} className="w-full h-full object-cover" />
              </div>
            )}
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{course.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{course.type} {course.category && `• ${course.category}`}</p>
                </div>
                <div className="flex gap-1">
                  {course.redirect_url && (
                    <a href={course.redirect_url} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-[#00E5FF]">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(course.id)}
                    className="h-8 w-8 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{course.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}