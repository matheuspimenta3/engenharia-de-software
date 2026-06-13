import React, { useState, useEffect } from 'react';
import './products.css';
import { api } from '../../api/axios-client'; // Importando o cliente axios que vocês criaram


export default function Products({ onMudarTela }: { onMudarTela: (tela: string) => void }) {
  // Começa com a lista vazia, esperando os dados do back-end
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Função que vai lá no Back-end buscar os produtos
  const carregarProdutos = async () => {
    try {
      setLoading(true);
      // Faz a requisição na rota de produtos do seu Back-end
      const response = await api.get('/products'); 
      
      // Salva os produtos que vieram do banco na nossa variável
      setProducts(response.data);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError('Não foi possível carregar os produtos do servidor.');
    } finally {
      setLoading(false);
    }
  };

  // O useEffect garante que essa busca aconteça assim que a página abrir
  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Barra Lateral de Navegação (Sidebar) */}
      <aside className="sidebar">
        <h3>Blackout Vestuário</h3>
        <ul>
  <li onClick={() => onMudarTela('dashboard')}>📊 Dashboard</li>
  <li className="active" onClick={() => onMudarTela('produtos')}>📦 Produtos</li>
  <li onClick={() => onMudarTela('categorias')}>🗂️ Categorias</li>
  <li onClick={() => onMudarTela('usuarios')}>👥 Usuários</li>
  <li style={{ marginTop: '2rem', color: '#f87171', cursor: 'pointer' }} onClick={() => onMudarTela('login')}>Sair</li>
</ul>
      </aside>

      {/* Conteúdo Principal da Tela */}
      <main className="main-content">
        <div className="top-bar">
          <h2>Estoque de Produtos</h2>
          <button className="btn-add" onClick={carregarProdutos}>🔄 Atualizar</button>
        </div>

        {/* Se estiver carregando, mostra um aviso */}
        {loading && <p style={{ color: '#3b82f6' }}>Buscando produtos no servidor...</p>}

        {/* Se o Back estiver desligado, mostra a mensagem de erro que você previu */}
        {error && (
          <div style={{ backgroundColor: '#7f1d1d', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0, color: '#f87171' }}>{error}</p>
            <small style={{ color: '#cbd5e1' }}>Certifique-se de que o Back-end do Alexandre está rodando.</small>
          </div>
        )}

        {/* Tabela de Dados */}
        {!loading && !error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome do Produto</th>
                  <th>Preço de Venda</th>
                  <th>Qtd em Estoque</th>
                  <th>Qtd Mínima</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8' }}>
                      Nenhum produto cadastrado no banco de dados.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td><strong>{product.name}</strong></td>
                      <td>R$ {Number(product.price).toFixed(2)}</td>
                      <td style={{ color: product.quantity <= product.minimumQuantity ? '#f87171' : '#f8fafc', fontWeight: 'bold' }}>
                        {product.quantity} {product.quantity <= product.minimumQuantity && '⚠️'}
                      </td>
                      <td>{product.minimumQuantity}</td>
                      <td>
                        <span className={product.active ? 'badge-active' : 'badge-inactive'}>
                          {product.active ? 'Ativo' : 'Inativo'}
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