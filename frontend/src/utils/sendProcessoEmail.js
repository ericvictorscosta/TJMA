import emailjs from 'emailjs-com';

export function sendProcessoEmail({ numero, classe, partes, valorCausa, status, juiz, destinatarioEmail }) {
  return emailjs.send(
    'SEU_SERVICE_ID',
    'SEU_TEMPLATE_ID',
    {
      numero,
      classe,
      partes: partes.join(', '),
      valorCausa,
      status,
      juiz,
      destinatarioEmail
    },
    'SEU_USER_ID'
  );
}
