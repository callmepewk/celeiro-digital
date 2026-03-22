import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { jsPDF } from 'npm:jspdf@2.5.2';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const leads = await base44.asServiceRole.entities.Lead.list();

    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(57, 255, 20);
    doc.text('Celeiro Digital', 20, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Relatório de Leads', 20, 30);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 20, 38);
    doc.text(`Total de Leads: ${leads.length}`, 20, 44);

    // Table headers
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    let y = 55;
    
    doc.text('Nome', 20, y);
    doc.text('Email', 80, y);
    doc.text('Telefone', 140, y);
    doc.line(20, y + 2, 190, y + 2);

    // Table content
    y += 8;
    doc.setFontSize(9);
    
    leads.forEach((lead) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.text(lead.full_name.substring(0, 25), 20, y);
      doc.text(lead.email.substring(0, 30), 80, y);
      doc.text(lead.phone || '-', 140, y);
      y += 8;
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Página ${i} de ${pageCount}`, 170, 285);
      doc.text('Celeiro Digital - Dados Protegidos pela LGPD', 60, 285);
    }

    const pdfBytes = doc.output('arraybuffer');

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=relatorio-leads.pdf'
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});