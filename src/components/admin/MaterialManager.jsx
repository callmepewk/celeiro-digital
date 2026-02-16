import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit2, Plus, Upload } from "lucide-react";

export default function MaterialManager() {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    pdf_url: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: materials } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const items = await base44.entities.Material.list();
      return items;
    },
    initialData: [],
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, image_url: file_url });
    } catch (error) {
      alert("Erro ao fazer upload da imagem");
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, pdf_url: file_url });
    } catch (error) {
      alert("Erro ao fazer upload do PDF");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price) {
      alert("Preencha título e preço");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await base44.entities.Material.update(editingId, formData);
      } else {
        await base44.entities.Material.create(formData);
      }
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      setFormData({ title: "", description: "", price: "", category: "", image_url: "", pdf_url: "" });
      setEditingId(null);
    } catch (error) {
      alert("Erro ao salvar material");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza?")) return;
    try {
      await base44.entities.Material.delete(id);
      queryClient.invalidateQueries({ queryKey: ['materials'] });
    } catch (error) {
      alert("Erro ao deletar");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Novo Material Didático</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Título *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="Ex: Guia de Marketing Digital"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Preço (R$) *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="99.90"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm"
              rows={2}
              placeholder="Descrição do material..."
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Categoria</label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-white/[0.04] border-white/10 text-white"
              placeholder="Ex: Educação, Negócios"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Imagem de Capa</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
                id="material-image"
              />
              <label
                htmlFor="material-image"
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-white/10 border-dashed text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                {uploading ? "Enviando..." : "Imagem"}
              </label>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Arquivo PDF</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                disabled={uploading}
                className="hidden"
                id="material-pdf"
              />
              <label
                htmlFor="material-pdf"
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-white/10 border-dashed text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                {uploading ? "Enviando..." : "PDF"}
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#39FF14] text-black hover:bg-[#39FF14]/90 font-semibold"
          >
            {loading ? "Salvando..." : editingId ? "Atualizar" : "Adicionar Material"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {materials.map((material) => (
          <Card key={material.id} className="bg-white/5 border-white/10 overflow-hidden">
            <div className="flex gap-4 p-4">
              {material.image_url && (
                <img src={material.image_url} alt={material.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{material.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{material.description}</p>
                <p className="text-[#39FF14] font-bold">R$ {parseFloat(material.price).toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFormData(material);
                    setEditingId(material.id);
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#00E5FF] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}