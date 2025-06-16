const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Rota fallback para SPA React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});