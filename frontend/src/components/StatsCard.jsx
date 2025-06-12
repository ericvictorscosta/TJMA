import React from 'react';  
import { BarChart2, DollarSign, FileText } from 'lucide-react';

const icons = {
  'Total de Processos': <BarChart2 className="w-7 h-7 text-blue-700" />,
  'Valor Total em Causas': <DollarSign className="w-7 h-7 text-blue-700" />,
  'Status Mais Frequente': <FileText className="w-7 h-7 text-blue-700" />,
};

export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white rounded shadow-sm p-6 flex items-center gap-4">
      <div className="bg-blue-100 rounded-full p-3">
        {icons[title] || icons['Total de Processos']}
      </div>
      <div>
        <div className="text-lg font-semibold text-slate-800">{value}</div>
        <div className="text-slate-500">{title}</div>
      </div>
    </div>
  );
}