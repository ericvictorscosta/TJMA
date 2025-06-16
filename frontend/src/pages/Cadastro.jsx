import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import logoTJ from '../../public/logo.png';

const perfis = [
  { value: 'administrador', label: 'Administrador' },
  { value: 'juiz', label: 'Juiz' },
  { value: 'advogado', label: 'Advogado' },
  { value: 'parte', label: 'Parte' },
  { value: 'servidor', label: 'Servidor' }
];

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    perfil: perfis[0].value,
    email: '',
    senha: ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!form.nome || !form.perfil || !form.email || !form.senha) {
      setErro('Preencha todos os campos.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.senha);
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        nome: form.nome,
        perfil: form.perfil,
        email: form.email
      });
      setSucesso('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setErro('Erro ao cadastrar. Verifique os dados ou tente outro e-mail.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-8 w-full max-w-lg space-y-5">
        <div className="flex flex-col items-center">
          <img src={logoTJ} alt="Logo TJMA" className="h-16 mb-2" />
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Cadastro</h2>
        {erro && <div className="bg-red-100 text-red-700 p-2 rounded">{erro}</div>}
        {sucesso && <div className="bg-green-100 text-green-700 p-2 rounded">{sucesso}</div>}
        <input
          className="w-full border rounded px-3 py-2"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <select
          className="w-full border rounded px-3 py-2"
          name="perfil"
          value={form.perfil}
          onChange={handleChange}
          required
        >
          {perfis.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <input
          className="w-full border rounded px-3 py-2"
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-semibold" type="submit">
          Cadastrar
        </button>
        <div className="text-center text-sm text-slate-500">
          Já tem conta? <Link to="/login" className="text-blue-700 hover:underline">Entrar</Link>
        </div>
      </form>
    </div>
  );
}
