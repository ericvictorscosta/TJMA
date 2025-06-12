const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const USE_SQL = process.env.USE_SQL === 'true';

const pool = new Pool({
  user: 'eric',
  host: 'localhost',
  database: 'TJMA DB',
  password: 'SUA_SENHA',
  port: 5432,
});

exports.getProcessos = async (req, res) => {
  const userId = req.query.userId;
  if (USE_SQL) {
    try {
      const result = await pool.query('SELECT * FROM processos WHERE "userId" = $1', [userId]);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar processos no banco SQL' });
    }
  } else {
    const filePath = path.join(__dirname, '../../processos.json');
    fs.readFile(filePath, (err, data) => {
      if (err) return res.status(500).json({ error: 'Erro ao ler processos' });
      const processos = JSON.parse(data);

      const userProcessos = processos.filter(p => p.userId === userId);
      res.json(userProcessos);
    });
  }
};

exports.addProcesso = (req, res) => {
  const filePath = path.join(__dirname, '../../processos.json');
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler processos' });
    let processos = [];
    try {
      processos = JSON.parse(data);
    } catch {
      
    }
    const novo = req.body;
    novo.id = processos.length > 0 ? Math.max(...processos.map(p => p.id)) + 1 : 1;
    
    novo.userId = req.body.userId;
    processos.push(novo);
    fs.writeFile(filePath, JSON.stringify(processos, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Erro ao salvar processo' });
      res.status(201).json(novo);
    });
  });
};

exports.deleteProcesso = (req, res) => {
  const filePath = path.join(__dirname, '../../processos.json');
  const id = Number(req.params.id);
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler processos' });
    let processos = [];
    try {
      processos = JSON.parse(data);
    } catch {}
    const idx = processos.findIndex(p => Number(p.id) === id);
    if (idx === -1) return res.status(404).json({ error: 'Processo não encontrado' });
    processos.splice(idx, 1);
    fs.writeFile(filePath, JSON.stringify(processos, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Erro ao excluir processo' });
      res.status(204).end();
    });
  });
};