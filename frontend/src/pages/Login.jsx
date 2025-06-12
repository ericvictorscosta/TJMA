import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');
    try {
      await signInWithEmailAndPassword(auth, form.email, form.senha);
      navigate('/');
    } catch (err) {
      setErro('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Login</h2>
        {erro && <div className="bg-red-100 text-red-700 p-2 rounded">{erro}</div>}
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
          Entrar
        </button>
        <div className="text-center text-sm text-slate-500">
          Não tem conta? <Link to="/cadastro" className="text-blue-700 hover:underline">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
}
