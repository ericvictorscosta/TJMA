import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, FileDown, Trash2 } from 'lucide-react';
import { API_BASE_URL } from '../utils/api';

export default function ProcessosTable({ refresh, userId }) {
  const [processos, setProcessos] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [processoToDelete, setProcessoToDelete] = useState(null);

  useEffect(() => {
    if (!userId) return;
    axios.get(`${API_BASE_URL}/api/processos?userId=${userId}`).then(resp => setProcessos(resp.data));
  }, [refresh, userId]);

  const handleGerarAlvara = async (processoId) => {
    setLoadingId(processoId);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/gerar-documento`,
        { id: processoId },
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `alvara-${processoId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Erro ao gerar o alvará. Tente novamente.');
    }
    setLoadingId(null);
  };

  const handleExcluirClick = (processoId) => {
    setProcessoToDelete(processoId);
    setShowConfirm(true);
  };

  const handleConfirmExcluir = async () => {
    const processoId = processoToDelete;
    setDeletingId(processoId);
    setShowConfirm(false);
    try {
      await axios.delete(`${API_BASE_URL}/api/processos/${processoId}`);
      setProcessos(processos => processos.filter(p => p.id !== processoId));
    } catch {
      alert('Erro ao excluir o processo.');
    }
    setDeletingId(null);
    setProcessoToDelete(null);
  };

  const handleCancelExcluir = () => {
    setShowConfirm(false);
    setProcessoToDelete(null);
  };

  return (
    <div className="bg-white rounded shadow-sm p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Processos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-slate-800">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="px-3 py-2 text-left">Nº do Processo</th>
              <th className="px-3 py-2 text-left">Classe</th>
              <th className="px-3 py-2 text-left">Partes</th>
              <th className="px-3 py-2 text-left">Valor da Causa</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {processos.map(proc => (
              <tr key={proc.id} className="border-b last:border-0">
                <td className="px-3 py-2">{proc.numero}</td>
                <td className="px-3 py-2">{proc.classe}</td>
                <td className="px-3 py-2">{proc.partes.join(' x ')}</td>
                <td className="px-3 py-2">{proc.valorCausa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className="px-3 py-2">{proc.status}</td>
                <td className="px-3 py-2 flex gap-2">
                  <button
                    onClick={() => handleGerarAlvara(proc.id)}
                    disabled={loadingId === proc.id}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-60"
                  >
                    {loadingId === proc.id ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Gerando...
                      </>
                    ) : (
                      <>
                        <FileDown size={18} /> Gerar Alvará
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleExcluirClick(proc.id)}
                    disabled={deletingId === proc.id}
                    className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-60"
                    title="Excluir processo"
                    style={{ minWidth: 40, minHeight: 40 }}
                  >
                    {deletingId === proc.id ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {processos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-slate-500 py-8">Nenhum processo encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-8 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Confirmar exclusão</h3>
            <p className="mb-6 text-slate-600">Tem certeza que deseja excluir este processo?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded border"
                onClick={handleCancelExcluir}
              >
                Não
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleConfirmExcluir}
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}