const fs = require('fs');
const path = require('path');

exports.getStats = (req, res) => {
  const userId = req.query.userId;
  const filePath = path.join(__dirname, '../../processos.json');
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler processos' });
    const processos = JSON.parse(data);

    const userProcessos = userId ? processos.filter(p => p.userId === userId) : processos;

    const stats = {
      totalProcessos: userProcessos.length,
      processosPorStatus: {},
      valorTotalCausas: 0
    };

    userProcessos.forEach(proc => {
      stats.processosPorStatus[proc.status] = (stats.processosPorStatus[proc.status] || 0) + 1;
      stats.valorTotalCausas += proc.valorCausa;
    });

    res.json(stats);
  });
};