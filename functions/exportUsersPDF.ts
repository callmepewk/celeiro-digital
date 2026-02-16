import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { jsPDF } from 'npm:jspdf@2.5.1';
import { format } from 'npm:date-fns@3.6.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const users = body.users || [];

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Header
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Relatório de Usuários', pageWidth / 2, yPosition, { align: 'center' });

    // Subtitle
    yPosition += 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100);
    doc.text(`Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, pageWidth / 2, yPosition, { align: 'center' });
    doc.text(`Total de usuários: ${users.length}`, pageWidth / 2, yPosition + 6, { align: 'center' });

    // Table
    yPosition += 18;
    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);

    const tableTop = yPosition;
    const col1 = 15;
    const col2 = 60;
    const col3 = 110;
    const col4 = 170;
    const rowHeight = 8;

    // Headers
    doc.setFillColor(57, 255, 20);
    doc.rect(col1 - 5, tableTop - 5, pageWidth - 20, rowHeight, 'F');
    doc.setTextColor(0);
    doc.text('Email', col1, tableTop);
    doc.text('Nome', col2, tableTop);
    doc.text('Role', col3, tableTop);
    doc.text('Data Criação', col4, tableTop);

    // Body
    yPosition = tableTop + rowHeight;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0);

    users.forEach((user, idx) => {
      if (yPosition > pageHeight - 15) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFillColor(idx % 2 === 0 ? 240 : 255);
      doc.rect(col1 - 5, yPosition - 5, pageWidth - 20, rowHeight, 'F');

      doc.setTextColor(0);
      const email = user.email || '';
      const name = user.full_name || '-';
      const role = user.role || '-';
      const date = user.created_date ? format(new Date(user.created_date), 'dd/MM/yyyy') : '-';

      doc.text(email.substring(0, 35), col1, yPosition);
      doc.text(name.substring(0, 35), col2, yPosition);
      doc.text(role, col3, yPosition);
      doc.text(date, col4, yPosition);

      yPosition += rowHeight;
    });

    const pdfData = doc.output('arraybuffer');
    return new Response(pdfData, {
      headers: { 'Content-Type': 'application/pdf' }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});