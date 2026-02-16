import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { format } from "date-fns";
import { base44 } from "@/api/base44Client";

export default function UsersTable({ users }) {
  const exportPDF = async () => {
    try {
      const { data: pdfBlob } = await base44.functions.invoke('exportUsersPDF', { users });
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-usuarios-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      alert('Erro ao gerar PDF: ' + error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-white">Usuários</h3>
        <Button onClick={exportPDF} className="bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold w-full sm:w-auto">
          <FileText className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      <Card className="bg-white/[0.02] border-white/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5">
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Nome</TableHead>
                  <TableHead className="text-gray-400">Role</TableHead>
                  <TableHead className="text-gray-400">Criado em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user.id} className="border-white/5">
                    <TableCell className="text-white">{user.email}</TableCell>
                    <TableCell className="text-gray-300">{user.full_name || '-'}</TableCell>
                    <TableCell>
                      <Badge
                        className={user.role === 'admin' ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'bg-[#00E5FF]/20 text-[#00E5FF]'}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {format(new Date(user.created_date), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}