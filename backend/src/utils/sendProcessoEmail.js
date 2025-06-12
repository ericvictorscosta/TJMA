const nodemailer = require('nodemailer');

async function sendProcessoEmail({ numero, classe, partes, valorCausa, status, juiz, destinatarioEmail }) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'SEU_EMAIL@gmail.com',
      pass: 'SUA_SENHA_DE_APP'
    }
  });

  let info = await transporter.sendMail({
    from: '"Painel Judicial" <SEU_EMAIL@gmail.com>',
    to: destinatarioEmail,
    subject: `Novo Processo Cadastrado: ${numero}`,
    html: `
      <h2>Processo cadastrado com sucesso!</h2>
      <p><b>Número:</b> ${numero}</p>
      <p><b>Classe:</b> ${classe}</p>
      <p><b>Partes:</b> ${partes.join(', ')}</p>
      <p><b>Valor da Causa:</b> R$ ${valorCausa}</p>
      <p><b>Status:</b> ${status}</p>
      <p><b>Juiz:</b> ${juiz}</p>
    `
  });

  return info;
}

module.exports = { sendProcessoEmail };
