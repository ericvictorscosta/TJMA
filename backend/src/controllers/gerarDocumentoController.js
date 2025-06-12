const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

exports.gerarDocumento = (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'ID do processo é obrigatório' });

  const filePath = path.join(__dirname, '../../processos.json');
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler processos' });
    const processos = JSON.parse(data);

    const processo = processos.find(p => Number(p.id) === Number(id));

    if (!processo) return res.status(404).json({ error: 'Processo não encontrado' });

    
    const processoJson = JSON.stringify(processo);
    const jarPath = path.join(__dirname, '../../../java-document-generator/target/document-generator-1.0-SNAPSHOT-jar-with-dependencies.jar');
    
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
};