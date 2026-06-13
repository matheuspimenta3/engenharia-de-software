import React, { useState, useEffect } from 'react';
import './categories.css';
import { api } from '../../api/axios-client'; // Importação do axios garantida e intocável

interface CategoriesProps {
  onMudarTela: (tela: string) => void;
}

export default function Categories({ onMudarTela }: CategoriesProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories'); 
      setCategories(response.data);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError('Não foi possível carregar as categorias do servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Barra Lateral de Navegação (Sidebar) */}
      <aside className="sidebar">
        <h3>Blackout Vestuário</h3>
        <ul>
          <li onClick={() => onMudarTela('dashboard')} style={{ cursor: 'pointer' }}>📊 Dashboard</li>
          <li onClick={() => onMudarTela('produtos')} style={{ cursor: 'pointer' }}>📦 Produtos</li>
          <li className="active" onClick={() => onMudarTela('categorias')} style={{ cursor: 'pointer' }}>🗂️ Categorias</li>
          <li onClick={() => onMudarTela('usuarios')} style={{ cursor: 'pointer' }}>👥 Usuários</li>
          <li style={{ marginTop: '2rem', color: '#f87171', cursor: 'pointer' }} onClick={() => onMudarTela('login')}>Sair</li>
        </ul>
      </aside>

      {/* Conteúdo Principal da Tela */}
      <main className="main-content">
        <div className="top-bar">
          <h2>Categorias de Produtos</h2>
          <button className="btn-add" onClick={carregarCategorias}>🔄 Atualizar</button>
        </div>

        {loading && <p style={{ color: '#3b82f6' }}>Buscando categorias...</p>}

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
                  <th>Código ID</th>
                  <th>Nome da Categoria</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={2} style={{ textAlign: 'center', color: '#94a3b8' }}>
                      Nenhuma categoria retornada do banco de dados.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td><code>{category.id}</code></td>
                      <td><strong>{category.name}</strong></td>
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