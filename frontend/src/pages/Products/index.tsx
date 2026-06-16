import React, { useState, useEffect } from 'react';
import './products.css';
import { api } from '../../api/axios-client';

export default function Products({ onMudarTela }: { onMudarTela: (tela: string) => void }) {
  // Estados da Listagem
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Estado com todos os 8 campos obrigatórios do seu CreateProductDto
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    costPrice: '',
    quantity: '',
    minimumQuantity: '',
    active: true,
  });

  // Função que busca os produtos para a tabela
  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data.data || []);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError('Não foi possível carregar os produtos do servidor.');
    } finally {
      setLoading(false);
    }
  };

  const carregarCategorias = async () => {
    try {
      const response = await api.get('/categories');
      // Como corrigimos a paginação do backend, os dados também vêm em .data.data
      setCategories(response.data.data || []);
    } catch (err) {
      console.error('Erro ao carregar categorias para o formulário:', err);
    }
  };

  // O useEffect garante o carregamento inicial de tudo
  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    if (!formData.categoryId) {
      setFormError('Por favor, selecione uma categoria válida.');
      setFormLoading(false);
      return;
    }

    try {
      // Monta o payload convertendo strings do formulário para os tipos numéricos exigidos no DTO
      const payload = {
        name: formData.name,
        description: formData.description,
        categoryId: formData.categoryId,
        price: Number(formData.price),
        costPrice: Number(formData.costPrice),
        quantity: Number(formData.quantity),
        minimumQuantity: Number(formData.minimumQuantity),
        active: Boolean(formData.active),
      };

      await api.post('/products', payload);

      // Se deu certo, reseta o formulário e fecha o Drawer
      setFormData({
        name: '',
        description: '',
        categoryId: '',
        price: '',
        costPrice: '',
        quantity: '',
        minimumQuantity: '',
        active: true,
      });
      setIsDrawerOpen(false);

      // Atualiza a tabela para exibir o novo item cadastrado
      carregarProdutos();
    } catch (err: any) {
      console.error(err);
      // Pega o erro 409 Conflict tratado no seu Controller ou erro genérico de validação
      if (err.response?.status === 409) {
        setFormError('Este nome de produto já está sendo utilizado.');
      } else {
        setFormError(err.response?.data?.message || 'Erro ao cadastrar produto. Verifique os campos.');
      }
    } finally {
      setFormLoading(false);
    }
  };
  const handleDeletarProduto = async (id: string, nome: string) => {
    // Uma confirmação simples para o usuário não deletar sem querer
    if (!window.confirm(`Tem certeza que deseja remover o produto "${nome}"?`)) {
      return;
    }

    try {
      // Dispara o DELETE para o endpoint do backend
      await api.delete(`/products/${id}`);

      // Atualiza a lista na tela imediatamente após deletar
      carregarProdutos();
      alert('Produto removido com sucesso!');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Erro ao tentar remover o produto.');
    }
  };
  // Atalho para atualizar os inputs dinamicamente
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'active' ? value === 'true' : value,
    }));
  };

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
          <div className="action-buttons">
            <button className="btn-update" onClick={carregarProdutos}>🔄 Atualizar</button>
            <button className="btn-add" onClick={() => setIsDrawerOpen(true)}>➕ Novo Produto</button>
          </div>
        </div>

        {/* Notificações de Carregamento e Erros da Tabela */}
        {loading && <p style={{ color: '#3b82f6' }}>Buscando produtos no servidor...</p>}
        {error && (
          <div style={{ backgroundColor: '#7f1d1d', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0, color: '#f87171' }}>{error}</p>
            <small style={{ color: '#cbd5e1' }}>Certifique-se de que o Back-end está rodando.</small>
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
                  <th>Ações</th> 
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8' }}> {/* Alterado colSpan para 6 */}
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
                      <td>
                        <button
                          className="btn-delete-table"
                          onClick={() => handleDeletarProduto(product.id, product.name)}
                          title="Remover Produto"
                        >
                          🗑️ Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>


      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Cadastrar Novo Produto</h3>
              <button className="btn-close" onClick={() => setIsDrawerOpen(false)}>✕</button>
            </div>

            {formError && (
              <div className="form-error-alert">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="product-form">
              <div className="form-group">
                <label>Nome do Produto*</label>
                <input type="text" name="name" value={formData.name} onChange={handleChangeInput} required placeholder="Ex: Camiseta Oversized Preta" />
              </div>

              <div className="form-group">
                <label>Descrição*</label>
                <textarea name="description" value={formData.description} onChange={handleChangeInput} required placeholder="Detalhes sobre material, caimento..." rows={2} />
              </div>

              <div className="form-group">
                <label>Categoria*</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChangeInput} required>
                  <option value="">-- Selecione uma Categoria --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <small style={{ color: '#f87171', marginTop: '4px', display: 'block' }}>
                    Nenhuma categoria ativa no sistema. Cadastre uma categoria primeiro!
                  </small>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preço de Venda (R$)*</label>
                  <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChangeInput} required placeholder="0.00" min="0" />
                </div>
                <div className="form-group">
                  <label>Preço de Custo (R$)*</label>
                  <input type="number" step="0.01" name="costPrice" value={formData.costPrice} onChange={handleChangeInput} required placeholder="0.00" min="0" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Estoque Inicial*</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChangeInput} required placeholder="0" min="0" />
                </div>
                <div className="form-group">
                  <label>Estoque Mínimo*</label>
                  <input type="number" name="minimumQuantity" value={formData.minimumQuantity} onChange={handleChangeInput} required placeholder="0" min="0" />
                </div>
              </div>

              <div className="form-group">
                <label>Disponibilidade*</label>
                <select name="active" value={String(formData.active)} onChange={handleChangeInput}>
                  <option value="true">Ativo (Disponível para venda)</option>
                  <option value="false">Inativo</option>
                </select>
              </div>

              <div className="drawer-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsDrawerOpen(false)} disabled={formLoading}>Cancelar</button>
                <button type="submit" className="btn-submit" disabled={formLoading}>
                  {formLoading ? 'Salvando...' : 'Salvar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
