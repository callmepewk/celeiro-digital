import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";

export default function CourseEditModal({ course, open, onClose }) {
  const [formData, setFormData] = useState(course || {});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await base44.entities.Course.update(course.id, formData);
      queryClient.invalidateQueries({ queryKey: ['activeCourses'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      onClose();
    } catch (error) {
      alert('Erro ao atualizar curso: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a0a0a] border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar Curso</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Nome do Curso</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-white/[0.04] border-white/10 text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="bg-white/[0.04] border-white/10 text-white"
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
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
              />
            </div>
          </div>
          {formData.type === 'video' && (
            <div>
              <label className="text-gray-400 text-sm mb-2 block">URL de Redirecionamento</label>
              <Input
                value={formData.redirect_url || ""}
                onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
              />
            </div>
          )}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="border-white/10 text-white">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}