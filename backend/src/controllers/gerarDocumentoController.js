const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

exports.gerarDocumento = (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'ID do processo é obrigatório' });

  const filePath = path.join(__dirname, '../../processos.json');
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler processos' });
    const processos = JSON.parse(data);

    const processo = processos.find(p => Number(p.id) === Number(id));
    if (!processo) return res.status(404).json({ error: 'Processo não encontrado' });

    // Criação do PDF estilizado
    const doc = new PDFDocument({ margin: 50 });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=alvara-${processo.id}.pdf`);
      res.send(pdfData);
    });

    // Logotipo (opcional, coloque um arquivo logo_tj.png em backend/src)
    const logoPath = path.join(__dirname, '../logo_tj.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, doc.page.width / 2 - 40, 30, { width: 80 });
    }
    doc.moveDown(fs.existsSync(logoPath) ? 2 : 4);

    // Título centralizado
    doc
      .fontSize(22)
      .fillColor('#2563eb')
      .font('Helvetica-Bold')
      .text('ALVARÁ DE PAGAMENTO', { align: 'center' });

    doc.moveDown(1);
    doc
      .moveTo(50, doc.y)
      .lineTo(doc.page.width - 50, doc.y)
      .strokeColor('#2563eb')
      .lineWidth(2)
      .stroke();

    doc.moveDown(2);

    // Campos destacados
    doc
      .fontSize(12)
      .fillColor('#222')
      .font('Helvetica-Bold')
      .text('Processo Nº: ', { continued: true })
      .font('Helvetica')
      .text(processo.numero);

    doc
      .font('Helvetica-Bold')
      .text('Classe: ', { continued: true })
      .font('Helvetica')
      .text(processo.classe);

    doc
      .font('Helvetica-Bold')
      .text('Status: ', { continued: true })
      .font('Helvetica')
      .text(processo.status);

    doc
      .font('Helvetica-Bold')
      .text('Valor da Causa: ', { continued: true })
      .font('Helvetica')
      .text(
        processo.valorCausa.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      );

    doc
      .font('Helvetica-Bold')
      .text('Partes: ', { continued: true })
      .font('Helvetica')
      .text(processo.partes.join(' x '));

    doc
      .font('Helvetica-Bold')
      .text('Juiz(a) Responsável: ', { continued: true })
      .font('Helvetica')
      .text(processo.juiz);

    doc.moveDown(2);

    doc
      .fontSize(11)
      .fillColor('#555')
      .font('Helvetica-Oblique')
      .text(
        'Este documento foi gerado automaticamente pelo sistema Painel de Gestão e Automação Judicial.',
        { align: 'center' }
      );

    doc.end();

    // --- CÓDIGO JAVA (comentado para referência futura) ---
    /*
    const processoJson = JSON.stringify(processo);
    const jarPath = path.join(__dirname, '../../../java-document-generator/target/document-generator-1.0-SNAPSHOT-jar-with-dependencies.jar');

    // Verifique se o JAR existe
    if (!fs.existsSync(jarPath)) {
      console.error('Arquivo JAR não encontrado:', jarPath);
      return res.status(500).json({ error: 'Arquivo JAR não encontrado no servidor.' });
    }

    // Verifique se o Java está disponível
    exec('java -version', (javaErr, stdout, stderr) => {
      if (javaErr) {
        console.error('Java não está instalado ou não está no PATH:', stderr);
        return res.status(500).json({ error: 'Java não está instalado no servidor.' });
      }

      const javaCmd = `java -jar "${jarPath}" "${processoJson.replace(/"/g, '\\"')}"`;

      exec(javaCmd, (error, stdout, stderr) => {
        if (error) {
          console.error('Erro ao executar o Java:', stderr);
          return res.status(500).json({ error: 'Erro ao gerar documento PDF.' });
        }
        const outputLines = stdout.trim().split('\n');
        const pdfPath = outputLines[outputLines.length - 1];

        if (!fs.existsSync(pdfPath)) {
          console.error('Arquivo PDF não encontrado:', pdfPath);
          return res.status(500).json({ error: 'Arquivo PDF não encontrado.' });
        }

        res.download(pdfPath, `alvara-${processo.id}.pdf`, (err) => {
          if (err) {
            console.error('Erro ao enviar PDF:', err);
          }
        });
      });
    });
    */

  });
};