const express = require('express');
const router = express.Router();

const statsController = require('../controllers/statsController');
const processosController = require('../controllers/processosController');
const gerarDocumentoController = require('../controllers/gerarDocumentoController');

router.get('/stats', statsController.getStats);
router.get('/processos', processosController.getProcessos);
router.post('/processos', processosController.addProcesso);
router.post('/gerar-documento', gerarDocumentoController.gerarDocumento);
router.delete('/processos/:id', processosController.deleteProcesso);

module.exports = router;