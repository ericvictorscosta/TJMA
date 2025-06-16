import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProcessosTable from '../components/ProcessosTable';
import axios from 'axios';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function maskNumeroProcesso(value) {
  value = value.replace(/\D/g, '');
  value = value
    .replace(/^(\d{7})(\d)/, '$1-$2')
    .replace(/^(\d{7}-\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{7}-\d{2}\.\d{4})(\d)/, '$1.$2')
    .replace(/^(\d{7}-\d{2}\.\d{4}\.\d)(\d)/, '$1.$2')
    .replace(/^(\d{7}-\d{2}\.\d{4}\.\d\.\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}).*/, '$1');
  return value;
}

export default function Processos() {   
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    numero: '',
    classe: '',
    partes: '',
    valorCausa: '',
    status: '',
    juiz: '',
    destinatarioEmail: '',
    destinatarioWhatsapp: ''
  });   
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (auth.currentUser) setUserId(auth.currentUser.uid);
  }, [auth.currentUser]);

  useEffect(() => {
  }, [refresh]);

  const handleChange = e => {
    if (e.target.name === 'numero') {
      setForm({ ...form, numero: maskNumeroProcesso(e.target.value) });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/processos`, {
        ...form,
        partes: form.partes.split(',').map(p => p.trim()),
        valorCausa: Number(form.valorCausa),
        userId
      });
      await addDoc(collection(db, "processos"), {
        ...form,
        partes: form.partes.split(',').map(p => p.trim()),
        valorCausa: Number(form.valorCausa),
        userId,
        dataCriacao: new Date().toISOString()
      });

      try {
        await axios.post('https://webhook.digitalpd.com/webhook/e71b6559-c30c-426d-84ce-5e555be98f52', {
          email: form.destinatarioEmail,
          whatsapp: form.destinatarioWhatsapp,
          numeroProcesso: form.numero,
          classe: form.classe,
          partes: form.partes,
          valorCausa: form.valorCausa,
          status: form.status,
          juiz: form.juiz
        });
      } catch (err) {
        console.warn('Falha ao enviar para o webhook:', err.message);
      }

      setShowModal(false);
      setForm({ numero: '', classe: '', partes: '', valorCausa: '', status: '', juiz: '', destinatarioEmail: '', destinatarioWhatsapp: '' });
      setRefresh(r => !r);
    } catch {
      alert('Erro ao adicionar processo.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">Todos os Processos</h2>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(true)}
            >
              Adicionar Processo
            </button>
          </div>
          <ProcessosTable refresh={refresh} userId={userId} />
        </main>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form
              className="bg-white rounded shadow-lg p-8 w-full max-w-md space-y-4"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl font-semibold mb-2">Novo Processo</h3>
              <input
                className="w-full border rounded px-3 py-2"
                name="numero"
                placeholder="Número do Processo"
                value={form.numero}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                name="classe"
                placeholder="Classe"
                value={form.classe}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                name="partes"
                placeholder="Partes (separe por vírgula)"
                value={form.partes}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                name="valorCausa"
                placeholder="Valor da Causa"
                type="number"
                value={form.valorCausa}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                name="status"
                placeholder="Status"
                value={form.status}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                name="juiz"
                placeholder="Juiz"
                value={form.juiz}
                onChange={handleChange}
                required
              />
              <input
                className="w-full border rounded px-3 py-2"
                name="destinatarioEmail"
                placeholder="E-mail do destinatário"
                value={form.destinatarioEmail}
                onChange={handleChange}
              />
              <input
                className="w-full border rounded px-3 py-2"
                name="destinatarioWhatsapp"
                placeholder="WhatsApp do destinatário (com DDD e país)"
                value={form.destinatarioWhatsapp}
                onChange={handleChange}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
