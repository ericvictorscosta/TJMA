import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Configuracoes() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Configurações</h2>
          <div className="bg-white rounded shadow-sm p-8 text-slate-600">
            <p>Configurações do sistema em breve.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
