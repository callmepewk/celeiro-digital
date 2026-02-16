import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, BookOpen, Download, Loader2, MapPin, UserPlus, FileText, Home, GraduationCap } from "lucide-react";
import SeoMetrics from "../components/admin/SeoMetrics";
import UsersTable from "../components/admin/UsersTable";
import CourseManager from "../components/admin/CourseManager";
import CityManager from "../components/admin/CityManager";
import LeadsTable from "../components/admin/LeadsTable";
import SpacesManager from "../components/admin/SpacesManager";
import MaterialManager from "../components/admin/MaterialManager";
import AnalyticsAdvanced from "../components/admin/AnalyticsAdvanced";
import StudentManager from "../components/admin/StudentManager";
import { createPageUrl } from "../utils";
import { Link } from "react-router-dom";

export default function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await base44.auth.me();
        if (user?.role !== 'admin') {
          window.location.href = createPageUrl('Home');
        } else {
          setCurrentUser(user);
        }
      } catch (error) {
        window.location.href = createPageUrl('Home');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const { data: seoMetrics } = useQuery({
    queryKey: ['seoMetrics'],
    queryFn: async () => {
      const res = await base44.functions.invoke('getSeoMetrics');
      return res.data;
    },
    enabled: !!currentUser,
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
    initialData: [],
    enabled: !!currentUser,
  });

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.list(),
    initialData: [],
    enabled: !!currentUser,
  });

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: () => base44.entities.City.list(),
    initialData: [],
    enabled: !!currentUser,
  });

  const { data: leads } = useQuery({
    queryKey: ['leads'],
    queryFn: () => base44.entities.Lead.list('-created_date'),
    initialData: [],
    enabled: !!currentUser,
  });

  const exportAllReports = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    // SEO Report
    const seoReport = JSON.stringify(seoMetrics, null, 2);
    const seoBlob = new Blob([seoReport], { type: 'application/json' });
    const seoLink = document.createElement('a');
    seoLink.href = URL.createObjectURL(seoBlob);
    seoLink.download = `relatorio-seo-${timestamp}.json`;
    seoLink.click();

    // Users Report
    setTimeout(() => {
      const usersData = users.map(u => ({
        email: u.email,
        nome: u.full_name,
        role: u.role,
        criado_em: u.created_date
      }));
      const usersBlob = new Blob([JSON.stringify(usersData, null, 2)], { type: 'application/json' });
      const usersLink = document.createElement('a');
      usersLink.href = URL.createObjectURL(usersBlob);
      usersLink.download = `relatorio-usuarios-${timestamp}.json`;
      usersLink.click();
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ paddingTop: "100px" }}>
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Painel Admin</h1>
            <p className="text-gray-400">Bem-vindo, {currentUser.full_name}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={exportAllReports}
              className="bg-[#39FF14]/20 border border-[#39FF14]/50 text-[#39FF14] hover:bg-[#39FF14]/30"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatórios
            </Button>
            <Link to={createPageUrl('Home')}>
              <Button className="bg-[#00E5FF]/20 border border-[#00E5FF]/50 text-[#00E5FF] hover:bg-[#00E5FF]/30">
                ← Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10 flex-wrap h-auto gap-2 p-2">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39FF14] data-[state=active]:to-[#00E5FF] data-[state=active]:text-black">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39FF14] data-[state=active]:to-[#00E5FF] data-[state=active]:text-black">
              <GraduationCap className="w-4 h-4 mr-2" />
              Alunos
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39FF14] data-[state=active]:to-[#00E5FF] data-[state=active]:text-black">
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39FF14] data-[state=active]:to-[#00E5FF] data-[state=active]:text-black">
              <BookOpen className="w-4 h-4 mr-2" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39FF14] data-[state=active]:to-[#00E5FF] data-[state=active]:text-black">
              <FileText className="w-4 h-4 mr-2" />
              Materiais
            </TabsTrigger>
            <TabsTrigger value="spaces" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39FF14] data-[state=active]:to-[#00E5FF] data-[state=active]:text-black">
              <Home className="w-4 h-4 mr-2" />
              Ambientes
            </TabsTrigger>
            <TabsTrigger value="cities" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39FF14] data-[state=active]:to-[#00E5FF] data-[state=active]:text-black">
              <MapPin className="w-4 h-4 mr-2" />
              Unidades
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39FF14] data-[state=active]:to-[#00E5FF] data-[state=active]:text-black">
              <UserPlus className="w-4 h-4 mr-2" />
              Leads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsAdvanced />
          </TabsContent>

          <TabsContent value="students">
            <StudentManager />
          </TabsContent>

          <TabsContent value="users">
            <UsersTable users={users} />
          </TabsContent>

          <TabsContent value="courses">
            <CourseManager courses={courses} />
          </TabsContent>

          <TabsContent value="materials">
            <MaterialManager />
          </TabsContent>

          <TabsContent value="spaces">
            <SpacesManager />
          </TabsContent>

          <TabsContent value="cities">
            <CityManager cities={cities} />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsTable leads={leads} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}