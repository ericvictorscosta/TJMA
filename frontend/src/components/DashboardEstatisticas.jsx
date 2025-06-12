import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  LineChart, Line
} from 'recharts';

function formatMesAno(dateStr) {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const d = new Date(dateStr);
  return `${meses[d.getMonth()]}/${String(d.getFullYear()).slice(-2)}`;
}

const COLORS = ['#2563eb', '#1e40af', '#60a5fa', '#818cf8', '#f59e42', '#f43f5e', '#10b981', '#fbbf24'];

export default function DashboardEstatisticas({ processos }) {
  if (!processos || processos.length === 0) {
    return (
      <div className="bg-white rounded shadow-sm p-8 text-slate-600 text-center">
        Sem dados suficientes para gerar estatísticas.
      </div>
    );
  }

  const statusCount = processos.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});
  const dadosStatus = Object.entries(statusCount).map(([status, quantidade]) => ({
    status, quantidade
  }));

  const cargaPorJuiz = processos
    .filter(p => p.status !== 'Arquivado')
    .reduce((acc, p) => {
      acc[p.juiz] = (acc[p.juiz] || 0) + 1;
      return acc;
    }, {});
  const dadosJuizes = Object.entries(cargaPorJuiz).map(([nome, processos]) => ({
    nome, processos
  }));

  const now = new Date();
  const meses = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    meses.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: formatMesAno(d), novos: 0 });
  }
  processos.forEach(p => {
    if (!p.dataCriacao) return;
    const d = new Date(p.dataCriacao);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const mes = meses.find(m => m.key === key);
    if (mes) mes.novos += 1;
  });
  const dadosEntrada = meses.map(m => ({ mes: m.label, novos: m.novos }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Processos por Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={v => [v, 'Quantidade']} />
            <Bar dataKey="quantidade" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Carga de Trabalho por Juiz</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dadosJuizes}
              dataKey="processos"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {dadosJuizes.map((entry, idx) => (
                <Cell key={entry.nome} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v, n, props) => [`${v} processo(s)`, '']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded shadow-sm p-6 md:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Novos Processos por Mês</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dadosEntrada}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={v => [v, 'Novos processos']} />
            <Line type="monotone" dataKey="novos" stroke="#2563eb" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
