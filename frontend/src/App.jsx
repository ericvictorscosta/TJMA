import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Processos from './pages/Processos';
import Estatisticas from './pages/Estatisticas';
import Configuracoes from './pages/Configuracoes';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/processos"
        element={
          <PrivateRoute>
            <Processos />
          </PrivateRoute>
        }
      />
      <Route
        path="/estatisticas"
        element={
          <PrivateRoute>
            <Estatisticas />
          </PrivateRoute>
        }
      />
      <Route
        path="/configuracoes"
        element={
          <PrivateRoute>
            <Configuracoes />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}