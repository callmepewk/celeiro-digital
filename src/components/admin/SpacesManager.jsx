import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2, Trash2, Plus, Upload } from "lucide-react";

export default function SpacesManager() {
  const [editingSpace, setEditingSpace] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    image_url: ""
  });
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  // Espaços padrão (hardcoded)
  const defaultSpaces = [
    { id: "coworking", name: "Coworking", tagline: "Espaço de trabalho colaborativo", description: "Ambiente preparado para profissionais que buscam conexões e produtividade." },
    { id: "sala-reuniao", name: "Sala de Reunião", tagline: "Espaço para encontros", description: "Salas equipadas com tecnologia para suas reuniões importantes." },
    { id: "laboratorio", name: "Laboratório", tagline: "Espaço tech", description: "Ambiente com computadores e ferramentas para projetos digitais." }
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, image_url: file_url });
    } catch (error) {
      alert("Erro ao fazer upload");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", tagline: "", description: "", image_url: "" });
    setEditingSpace(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Gerenciar Ambientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Nome do Ambiente *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="Ex: Coworking"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Tagline *</label>
              <Input
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="Ex: Espaço de trabalho colaborativo"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Descrição *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm"
                rows={3}
                placeholder="Descrição do ambiente..."
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Imagem</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                  id="space-upload"
                />
                <label
                  htmlFor="space-upload"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg border border-white/10 border-dashed text-gray-400 hover:text-white cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  {uploading ? "Enviando..." : "Clique para fazer upload"}
                </label>
              </div>
              {formData.image_url && (
                <img src={formData.image_url} alt="preview" className="w-full rounded-lg mt-3 max-h-48 object-cover" />
              )}
            </div>

            <Button
              onClick={resetForm}
              className="w-full bg-white/5 hover:bg-white/10 text-white"
            >
              Limpar
            </Button>
          </div>

          <div className="text-sm text-gray-400 p-3 bg-white/5 rounded-lg">
            <strong>Nota:</strong> Os ambientes são exibidos na seção "Ambientes" da página inicial. Você pode atualizar as imagens e descrições aqui.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}