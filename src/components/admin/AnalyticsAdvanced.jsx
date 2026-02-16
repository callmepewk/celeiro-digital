import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Download, TrendingUp, Users, Eye, Clock } from "lucide-react";

export default function AnalyticsAdvanced() {
  const [loading, setLoading] = useState(false);

  const { data: analytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const items = await base44.entities.Analytics.list();
      return items;
    },
    initialData: [],
  });

  const calculateMetrics = () => {
    const pageViews = analytics.filter(a => a.event_type === 'page_view').length;
    const uniqueSessions = new Set(analytics.map(a => a.session_id)).size;
    const contactClicks = analytics.filter(a => a.event_type === 'contact_click').length;
    const courseClicks = analytics.filter(a => a.event_type === 'course_click').length;
    const avgDuration = analytics.length > 0 
      ? (analytics.reduce((sum, a) => sum + (a.duration_seconds || 0), 0) / uniqueSessions || 0)
      : 0;

    return {
      pageViews,
      uniqueSessions,
      contactClicks,
      courseClicks,
      avgDuration: Math.round(avgDuration)
    };
  };

  const handleExportPDF = async () => {
    setLoading(true);
    try {
      const metrics = calculateMetrics();
      const content = `
        RELATÓRIO DE ANALYTICS - CELEIRO DIGITAL
        Data: ${new Date().toLocaleDateString('pt-BR')}
        
        MÉTRICAS PRINCIPAIS:
        - Visualizações de Página: ${metrics.pageViews}
        - Sessões Únicas: ${metrics.uniqueSessions}
        - Tempo Médio de Permanência: ${metrics.avgDuration}s
        - Cliques em Contato: ${metrics.contactClicks}
        - Cliques em Cursos: ${metrics.courseClicks}
      `;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Crie um relatório PDF profissional estruturado com os seguintes dados: ${content}. O relatório deve ser formatado com seções claras, cores profissionais e dados organizados. Retorne apenas o HTML necessário para gerar um PDF bonito.`,
      });

      // Simular download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      alert("Erro ao gerar relatório");
    } finally {
      setLoading(false);
    }
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Visualizações</p>
                <p className="text-2xl font-bold text-white mt-2">{metrics.pageViews}</p>
              </div>
              <Eye className="w-8 h-8 text-[#39FF14] opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Sessões</p>
                <p className="text-2xl font-bold text-white mt-2">{metrics.uniqueSessions}</p>
              </div>
              <Users className="w-8 h-8 text-[#00E5FF] opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tempo Médio</p>
                <p className="text-2xl font-bold text-white mt-2">{metrics.avgDuration}s</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contatos</p>
                <p className="text-2xl font-bold text-white mt-2">{metrics.contactClicks}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-400 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Cursos</p>
                <p className="text-2xl font-bold text-white mt-2">{metrics.courseClicks}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#39FF14] opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Eventos Detalhados</CardTitle>
            <Button
              onClick={handleExportPDF}
              disabled={loading}
              className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 gap-2"
            >
              <Download className="w-4 h-4" />
              {loading ? "Gerando..." : "Exportar PDF"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-400">Tipo</th>
                  <th className="text-left py-3 px-4 text-gray-400">Página</th>
                  <th className="text-left py-3 px-4 text-gray-400">Sessão</th>
                  <th className="text-left py-3 px-4 text-gray-400">Data</th>
                </tr>
              </thead>
              <tbody>
                {analytics.slice(0, 10).map((event, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-white">{event.event_type}</td>
                    <td className="py-3 px-4 text-gray-400">{event.page}</td>
                    <td className="py-3 px-4 text-gray-400 text-xs">{event.session_id?.substring(0, 8)}...</td>
                    <td className="py-3 px-4 text-gray-400">{event.created_date ? new Date(event.created_date).toLocaleDateString('pt-BR') : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}