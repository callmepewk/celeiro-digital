import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit2, Check } from "lucide-react";

export default function SpacesManager() {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newSpace, setNewSpace] = useState({
    name: "",
    tagline: "",
    description: "",
    image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: spaces } = useQuery({
    queryKey: ['spaces'],
    queryFn: async () => {
      return await base44.entities.Space?.list?.() || [];
    },
    initialData: [],
  });

  const handleAddSpace = async () => {
    if (!newSpace.name || !newSpace.tagline || !newSpace.description) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      await base44.entities.Space.create({
        name: newSpace.name,
        tagline: newSpace.tagline,
        description: newSpace.description,
        image_url: newSpace.image_url,
        is_displayed: true
      });

      queryClient.invalidateQueries({ queryKey: ['spaces'] });
      setNewSpace({ name: "", tagline: "", description: "", image_url: "" });
    } catch (error) {
      alert("Erro ao adicionar ambiente");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    if (!editData[id]) return;

    setLoading(true);
    try {
      await base44.entities.Space.update(id, editData[id]);
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
      setEditingId(null);
      setEditData({});
    } catch (error) {
      alert("Erro ao atualizar ambiente");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja excluir este ambiente?")) return;

    try {
      await base44.entities.Space.delete(id);
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
    } catch (error) {
      alert("Erro ao deletar ambiente");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Gerenciar Ambientes Exibidos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Nome do Ambiente *</label>
              <Input
                value={newSpace.name}
                onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="Ex: Sala de Conferência"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Tagline *</label>
              <Input
                value={newSpace.tagline}
                onChange={(e) => setNewSpace({ ...newSpace, tagline: e.target.value })}
                className="bg-white/[0.04] border-white/10 text-white"
                placeholder="Ex: Inovação e Criatividade"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Descrição *</label>
            <textarea
              value={newSpace.description}
              onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/10 text-white rounded-md p-2"
              placeholder="Descreva o ambiente"
              rows="3"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Imagem (800x600px recomendado)</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setLoading(true);
                  try {
                    const { file_url } = await base44.integrations.Core.UploadFile({ file });
                    setNewSpace({ ...newSpace, image_url: file_url });
                  } catch (error) {
                    alert("Erro ao fazer upload da imagem");
                  } finally {
                    setLoading(false);
                  }
                }
              }}
              className="w-full bg-white/[0.04] border border-white/10 text-white rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#39FF14] file:text-black hover:file:bg-[#39FF14]/90"
            />
            {newSpace.image_url && (
              <img src={newSpace.image_url} alt="Preview" className="mt-2 rounded-lg max-h-32 object-cover" />
            )}
          </div>

          <Button
            onClick={handleAddSpace}
            disabled={loading}
            className="w-full bg-[#39FF14] text-black hover:bg-[#39FF14]/90 font-semibold"
          >
            {loading ? "Adicionando..." : "Adicionar Ambiente"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-white font-semibold">Ambientes Cadastrados ({spaces.length})</h3>
        {spaces.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum ambiente cadastrado</p>
        ) : (
          spaces.map((space) => (
            <Card key={space.id} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                {editingId === space.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editData[space.id]?.name || space.name}
                      onChange={(e) => setEditData(prev => ({
                        ...prev,
                        [space.id]: { ...prev[space.id], name: e.target.value }
                      }))}
                      className="bg-white/[0.04] border-white/10 text-white"
                    />
                    <Input
                      value={editData[space.id]?.tagline || space.tagline}
                      onChange={(e) => setEditData(prev => ({
                        ...prev,
                        [space.id]: { ...prev[space.id], tagline: e.target.value }
                      }))}
                      className="bg-white/[0.04] border-white/10 text-white"
                    />
                    <textarea
                      value={editData[space.id]?.description || space.description}
                      onChange={(e) => setEditData(prev => ({
                        ...prev,
                        [space.id]: { ...prev[space.id], description: e.target.value }
                      }))}
                      className="w-full bg-white/[0.04] border border-white/10 text-white rounded-md p-2"
                      rows="2"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setLoading(true);
                          try {
                            const { file_url } = await base44.integrations.Core.UploadFile({ file });
                            setEditData(prev => ({
                              ...prev,
                              [space.id]: { ...prev[space.id], image_url: file_url }
                            }));
                          } catch (error) {
                            alert("Erro ao fazer upload da imagem");
                          } finally {
                            setLoading(false);
                          }
                        }
                      }}
                      className="w-full bg-white/[0.04] border border-white/10 text-white rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#39FF14] file:text-black hover:file:bg-[#39FF14]/90"
                    />
                    {(editData[space.id]?.image_url || space.image_url) && (
                      <img src={editData[space.id]?.image_url || space.image_url} alt="Preview" className="mt-2 rounded-lg max-h-32 object-cover" />
                    )}
                    <Button
                      onClick={() => handleUpdate(space.id)}
                      disabled={loading}
                      className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 w-full"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-white font-semibold">{space.name}</p>
                      <p className="text-[#39FF14] text-sm">{space.tagline}</p>
                      <p className="text-gray-400 text-sm mt-2">{space.description}</p>
                      {space.image_url && (
                        <img src={space.image_url} alt={space.name} className="mt-3 rounded-lg max-h-32 object-cover" />
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setEditingId(space.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(space.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}