import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import ProcessosTable from '../components/ProcessosTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { API_BASE_URL } from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProcessos: 0,
    processosPorStatus: {},
    valorTotalCausas: 0
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    axios.get(`${API_BASE_URL}/api/stats?userId=${user.uid}`).then(resp => setStats(resp.data));
  }, [user]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700 text-center">Painel de Gestão Judicial</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard title="Total de Processos" value={stats.totalProcessos} />
            <StatsCard title="Valor Total em Causas" value={stats.valorTotalCausas?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
            <StatsCard title="Status Mais Frequente" value={stats.processosPorStatus ? Object.entries(stats.processosPorStatus).reduce((a,b) => a[1]>b[1]?a:b,['',0])[0] : ''} />
          </div>
          <ProcessosTable userId={user?.uid} />
        </main>
      </div>
    </div>
  );
}