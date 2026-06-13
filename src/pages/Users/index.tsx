import React, { useState, useEffect } from 'react';
import './users.css';
import { api } from '../../api/axios-client'; // Importação do axios mantida e protegida

export default function Users({ onMudarTela }: { onMudarTela: (tela: string) => void }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users'); 
      setUsers(response.data);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError('Não foi possível carregar os usuários do servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Barra Lateral de Navegação (Sidebar) */}
      <aside className="sidebar">
        <h3>Blackout Vestuário</h3>
        <ul>
  <li onClick={() => onMudarTela('dashboard')}>📊 Dashboard</li>
  <li onClick={() => onMudarTela('produtos')}>📦 Produtos</li>
  <li onClick={() => onMudarTela('categorias')}>🗂️ Categorias</li>
  <li className="active" onClick={() => onMudarTela('usuarios')}>👥 Usuários</li>
  <li style={{ marginTop: '2rem', color: '#f87171', cursor: 'pointer' }} onClick={() => onMudarTela('login')}>Sair</li>
</ul>
      </aside>

      {/* Conteúdo Principal da Tela */}
      <main className="main-content">
        <div className="top-bar">
          <h2>Controle de Usuários</h2>
          <button className="btn-add" onClick={carregarUsuarios}>🔄 Atualizar</button>
        </div>

        {loading && <p style={{ color: '#3b82f6' }}>Buscando usuários...</p>}

        {error && (
          <div style={{ backgroundColor: '#7f1d1d', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0, color: '#f87171' }}>{error}</p>
            <small style={{ color: '#cbd5e1' }}>Certifique-se de que o Back-end do Alexandre está rodando.</small>
          </div>
        )}

        {!loading && !error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Cargo / Permissão</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', color: '#94a3b8' }}>
                      Nenhum usuário retornado do banco de dados.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td><strong>{user.name}</strong></td>
                      <td>{user.email}</td>
                      <td>
                        {/* Corrigido: fechamento de aspas simples perfeito aqui */}
                        <span className={user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}