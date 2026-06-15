import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { api } from '../../api/axios-client'; // Importação do axios blindada

interface DashboardProps {
  onMudarTela: (tela: string) => void;
}

export default function Dashboard({ onMudarTela }: DashboardProps) {
  // Estados para guardar os totais reais vindos do Back-end
  const [totalProdutos, setTotalProdutos] = useState<number>(0);
  const [totalCategorias, setTotalCategorias] = useState<number>(0);
  const [totalUsuarios, setTotalUsuarios] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const carregarDadosDashboard = async () => {
    try {
      setLoading(true);
      setError('');

      // Faz as três chamadas ao mesmo tempo para puxar os dados do Back
      const [resProdutos, resCategorias, resUsuarios] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
        api.get('/users')
      ]);

      // 🔹 ATUALIZAÇÃO CRÍTICA: Lendo a propriedade .total enviada pelo backend paginado
      // Caso o endpoint não use a paginação (ex: usuários antigos), o fallback busca o .length do array interno ou do escopo principal.
      setTotalProdutos(resProdutos.data.total !== undefined ? resProdutos.data.total : (resProdutos.data.data?.length || resProdutos.data.length || 0));
      setTotalCategorias(resCategorias.data.total !== undefined ? resCategorias.data.total : (resCategorias.data.data?.length || resCategorias.data.length || 0));
      setTotalUsuarios(resUsuarios.data.total !== undefined ? resUsuarios.data.total : (resUsuarios.data.data?.length || resUsuarios.data.length || 0));

    } catch (err: any) {
      console.error(err);
      setError('Erro ao conectar com o servidor do Alexandre.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDadosDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Barra Lateral de Navegação (Sidebar) */}
      <aside className="sidebar">
        <h3>Blackout Vestuário</h3>
        <ul>
          <li className="active" onClick={() => onMudarTela('dashboard')}>📊 Dashboard</li>
          <li onClick={() => onMudarTela('produtos')}>📦 Produtos</li>
          {/* 🔹 CORREÇÃO DE ROTA: Alterado de 'categories' para 'categorias' para alinhar com o app */}
          <li onClick={() => onMudarTela('categorias')}>🗂️ Categorias</li>
          <li onClick={() => onMudarTela('usuarios')}>👥 Usuários</li>
          <li style={{ marginTop: '2rem', color: '#f87171', cursor: 'pointer' }} onClick={() => onMudarTela('login')}>Sair</li>
        </ul>
      </aside>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="top-bar">
          <h2>Painel de Controle</h2>
          <p style={{ color: '#94a3b8', margin: 0 }}>Visão geral em tempo real</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#7f1d1d', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0, color: '#f87171' }}>{error}</p>
            <small style={{ color: '#cbd5e1' }}>Os números abaixo podem estar desatualizados se o back-end estiver offline.</small>
          </div>
        )}

        {loading ? (
          <p style={{ color: '#3b82f6' }}>Sincronizando dados com o back-end...</p>
        ) : (
          /* Cards com os dados dinâmicos do Axios */
          <div className="cards-grid">
            <div className="card">
              <h4>Total de Produtos</h4>
              <p>{totalProdutos}</p>
            </div>
            <div className="card">
              <h4>Categorias Ativas</h4>
              <p>{totalCategorias}</p>
            </div>
            <div className="card">
              <h4>Usuários Cadastrados</h4>
              <p>{totalUsuarios}</p>
            </div>
            <div className="card alert">
              <h4>Status do Sistema</h4>
              <p style={{ fontSize: '1.2rem', color: '#10b981' }}>Online ✓</p>
            </div>
          </div>
        )}

        <div className="welcome-box">
          <p style={{ color: '#cbd5e1', margin: 0 }}>
            Painel integrado com o banco de dados. Use o menu lateral para navegar pelas tabelas.
          </p>
        </div>
      </main>
    </div>
  );
}