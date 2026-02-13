import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { format } from "date-fns";
import { base44 } from "@/api/base44Client";

export default function LeadsTable({ leads }) {
  const exportCSV = () => {
    const csvContent = [
      ['Nome', 'Email', 'Telefone', 'Data de Cadastro'].join(','),
      ...leads.map(l => [
        l.full_name,
        l.email,
        l.phone,
        format(new Date(l.created_date), 'dd/MM/yyyy HH:mm')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-celeiro-digital-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const exportPDF = async () => {
    try {
      const { data: pdfBlob } = await base44.functions.invoke('exportLeadsPDF', { leads });
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-leads-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Leads Capturados</h3>
          <p className="text-gray-400 text-sm mt-1">Total: {leads?.length || 0} leads</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportCSV} variant="outline" className="border-white/10 text-white">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button onClick={exportPDF} className="bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold">
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <Card className="bg-white/[0.02] border-white/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5">
                  <TableHead className="text-gray-400">Nome</TableHead>
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Telefone</TableHead>
                  <TableHead className="text-gray-400">Data de Cadastro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads?.map((lead) => (
                  <TableRow key={lead.id} className="border-white/5">
                    <TableCell className="text-white font-medium">{lead.full_name}</TableCell>
                    <TableCell className="text-gray-300">{lead.email}</TableCell>
                    <TableCell className="text-gray-300">{lead.phone}</TableCell>
                    <TableCell className="text-gray-400">
                      {format(new Date(lead.created_date), 'dd/MM/yyyy HH:mm')}
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