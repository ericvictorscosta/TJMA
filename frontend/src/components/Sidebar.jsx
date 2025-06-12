import React from 'react';
import { Gavel, LayoutDashboard, FileText, BarChart2, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { to: '/processos', label: 'Processos', icon: <FileText size={20} /> },
  { to: '/estatisticas', label: 'Estatísticas', icon: <BarChart2 size={20} /> },
  { to: '/configuracoes', label: 'Configurações', icon: <Settings size={20} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col min-h-screen shadow-lg">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-200">
        <Gavel size={32} className="text-blue-700" />
        <span className="font-bold text-xl text-slate-800">TJMA</span>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 font-medium rounded transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`
                }
                end={item.to === '/'}
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-6 py-4 border-t border-slate-200 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} TJMA
      </div>
    </aside>
  );
}