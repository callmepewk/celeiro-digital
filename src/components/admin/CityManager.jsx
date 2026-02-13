import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, MapPin, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

export default function CityManager({ cities }) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    address: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: "",
  });
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await base44.entities.City.create({
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        is_active: true,
        is_matriz: false,
      });

      queryClient.invalidateQueries({ queryKey: ['cities'] });
      setFormData({ name: "", state: "", address: "", phone: "", email: "", latitude: "", longitude: "" });
      setIsAdding(false);
    } catch (error) {
      alert('Erro ao criar cidade: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta unidade?')) return;
    
    try {
      await base44.entities.City.delete(id);
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    } catch (error) {
      alert('Erro ao excluir cidade: ' + error.message);
    }
  };

  const toggleMatriz = async (city) => {
    try {
      // Remove matriz de todas
      const allCities = cities || [];
      for (const c of allCities) {
        if (c.is_matriz && c.id !== city.id) {
          await base44.entities.City.update(c.id, { is_matriz: false });
        }
      }
      
      // Define nova matriz
      await base44.entities.City.update(city.id, { is_matriz: !city.is_matriz });
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    } catch (error) {
      alert('Erro ao atualizar matriz: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Gerenciamento de Unidades</h3>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Unidade
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-white/[0.02] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Nova Unidade</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Cidade</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/[0.04] border-white/10 text-white"
                    placeholder="Porto Firme"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Estado (UF)</label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                    required
                    maxLength={2}
                    className="bg-white/[0.04] border-white/10 text-white"
                    placeholder="MG"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Endereço Completo</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-white/[0.04] border-white/10 text-white"
                  placeholder="Rua, número, bairro"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Telefone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/[0.04] border-white/10 text-white"
                    placeholder="(54) 99155-4136"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Email</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    className="bg-white/[0.04] border-white/10 text-white"
                    placeholder="contato@cidade.com"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Latitude (opcional)</label>
                  <Input
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    type="number"
                    step="any"
                    className="bg-white/[0.04] border-white/10 text-white"
                    placeholder="-20.4500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Longitude (opcional)</label>
                  <Input
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    type="number"
                    step="any"
                    className="bg-white/[0.04] border-white/10 text-white"
                    placeholder="-43.1000"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)} className="border-white/10 text-white">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold">
                  Criar Unidade
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {cities?.map((city) => (
          <Card key={city.id} className="bg-white/[0.02] border-white/10">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-semibold text-lg">{city.name}</h4>
                    <Badge variant="outline" className="border-[#00E5FF]/30 text-[#00E5FF]">
                      {city.state}
                    </Badge>
                  </div>
                  {city.address && <p className="text-gray-400 text-sm mb-2">{city.address}</p>}
                  {city.is_matriz && (
                    <Badge className="bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/30">
                      <Star className="w-3 h-3 mr-1" />
                      Matriz
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleMatriz(city)}
                    className="h-8 w-8 text-gray-400 hover:text-[#39FF14]"
                  >
                    <Star className={`w-4 h-4 ${city.is_matriz ? 'fill-[#39FF14] text-[#39FF14]' : ''}`} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(city.id)}
                    className="h-8 w-8 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {(city.phone || city.email) && (
                <div className="space-y-1 text-sm">
                  {city.phone && <p className="text-gray-400">Tel: {city.phone}</p>}
                  {city.email && <p className="text-gray-400">Email: {city.email}</p>}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}