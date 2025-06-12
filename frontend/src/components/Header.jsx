import React, { useEffect, useState } from 'react'; 
import { LogOut } from 'lucide-react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

export default function Header() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('Usuário');

  useEffect(() => {
    const fetchNome = async () => {
      if (auth.currentUser) {
        const ref = doc(db, 'usuarios', auth.currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const nome = snap.data().nome || '';
          const nomes = nome.trim().split(' ');
          setNomeUsuario(nomes.slice(0, 2).join(' '));
        }
      }
    };
    fetchNome();
  }, [auth.currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header className="bg-blue-700 px-8 py-4 border-b border-slate-200 flex items-center justify-between shadow-sm">
      <h1 className="text-2xl font-semibold text-white tracking-tight">Painel de Gestão Judicial</h1>
      <div className="flex items-center gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nomeUsuario)}&background=1d4ed8&color=fff`}
          alt="Usuário"
          className="w-10 h-10 rounded-full border-2 border-blue-700 shadow"
        />
        <span className="font-medium text-white">{nomeUsuario}</span>
        <button
          className="ml-2 p-2 rounded hover:bg-slate-100 transition-colors"
          title="Sair"
          onClick={handleLogout}
        >
          <LogOut size={20} className="text-slate-200" />
        </button>
      </div>
    </header>
  );
}