import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import DashboardEstatisticas from '../components/DashboardEstatisticas';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Estatisticas() {
  const [stats, setStats] = useState({
    statusCount: {},
    valorPorClasse: {},
    totalProcessos: 0,
    valorTotal: 0
  });
  const [processos, setProcessos] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:3001/api/processos?userId=${user.uid}`)
      .then(res => {
        const processos = res.data;
        setProcessos(processos);
        const statusCount = {};
        const valorPorClasse = {};
        let valorTotal = 0;
        processos.forEach(p => {
          statusCount[p.status] = (statusCount[p.status] || 0) + 1;
          valorPorClasse[p.classe] = (valorPorClasse[p.classe] || 0) + (p.valorCausa || 0);
          valorTotal += p.valorCausa || 0;
        });
        setStats({
          statusCount,
          valorPorClasse,
          totalProcessos: processos.length,
          valorTotal
        });
      });
  }, [user]);

  const barData = {
    labels: Object.keys(stats.valorPorClasse),
    datasets: [
      {
        label: 'Valor Total por Classe',
        data: Object.values(stats.valorPorClasse),
        backgroundColor: 'rgba(29, 78, 216, 0.7)'
      }
    ]
  };

  const pieData = {
    labels: Object.keys(stats.statusCount),
    datasets: [
      {
        label: 'Processos por Status',
        data: Object.values(stats.statusCount),
        backgroundColor: [
          'rgba(29, 78, 216, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(96, 165, 250, 0.7)',
          'rgba(203, 213, 225, 0.7)'
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Estatísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded shadow p-4">
              <h3 className="font-semibold text-slate-700 mb-2">Valor Total por Classe</h3>
              <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
            <div className="bg-white rounded shadow p-4">
              <h3 className="font-semibold text-slate-700 mb-2">Distribuição por Status</h3>
              <Pie data={pieData} options={{ responsive: true }} />
            </div>
          </div>
          <DashboardEstatisticas processos={processos} />
        </main>
      </div>
    </div>
  );
}
