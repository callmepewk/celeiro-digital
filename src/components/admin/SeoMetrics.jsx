import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Clock, Activity, Search, Link2, Zap, Smartphone, Monitor } from "lucide-react";

export default function SeoMetrics({ metrics }) {
  if (!metrics) return null;

  const statCards = [
    { icon: Users, label: "Total de Visualizações", value: metrics.overview.totalPageViews.toLocaleString(), color: "#39FF14" },
    { icon: Activity, label: "Visitantes Únicos", value: metrics.overview.uniqueVisitors.toLocaleString(), color: "#00E5FF" },
    { icon: Clock, label: "Duração Média", value: metrics.overview.avgSessionDuration, color: "#39FF14" },
    { icon: TrendingUp, label: "Taxa de Rejeição", value: metrics.overview.bounceRate, color: "#00E5FF" },
  ];

  const seoCards = [
    { icon: Search, label: "Tráfego Orgânico", value: metrics.seo.organicTraffic.toLocaleString(), color: "#39FF14" },
    { icon: Activity, label: "Rankings de Palavras", value: metrics.seo.keywordRankings, color: "#00E5FF" },
    { icon: Link2, label: "Backlinks", value: metrics.seo.backlinks, color: "#39FF14" },
    { icon: Zap, label: "Domain Authority", value: metrics.seo.domainAuthority, color: "#00E5FF" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Overview Geral</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="bg-white/[0.02] border-white/10">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Métricas de SEO</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {seoCards.map((stat) => (
            <Card key={stat.label} className="bg-white/[0.02] border-white/10">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/[0.02] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Page Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Mobile</span>
                  </div>
                  <span className="text-[#39FF14] font-semibold">{metrics.seo.pageSpeed.mobile}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#39FF14] to-[#00E5FF]" style={{ width: `${metrics.seo.pageSpeed.mobile}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Desktop</span>
                  </div>
                  <span className="text-[#00E5FF] font-semibold">{metrics.seo.pageSpeed.desktop}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00E5FF] to-[#39FF14]" style={{ width: `${metrics.seo.pageSpeed.desktop}%` }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Fontes de Tráfego</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metrics.traffic).map(([source, percentage]) => (
                <div key={source}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm capitalize">{source}</span>
                    <span className="text-white font-semibold">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#39FF14] to-[#00E5FF]" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/[0.02] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Top Páginas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topPages.map((page) => (
                <div key={page.page} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div>
                    <p className="text-white font-medium text-sm">{page.page}</p>
                    <p className="text-gray-500 text-xs">Tempo médio: {page.avgTime}</p>
                  </div>
                  <span className="text-[#39FF14] font-semibold">{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Palavras-chave Principais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.keywords.map((kw) => (
                <div key={kw.keyword} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{kw.keyword}</p>
                    <p className="text-gray-500 text-xs">Volume: {kw.volume}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Posição</span>
                    <span className="text-[#00E5FF] font-bold text-lg">#{kw.position}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}