import React, { useState, useEffect } from 'react';
import './categories.css';
import { api } from '../../api/axios-client'; // Importação do axios garantida e intocável

interface CategoriesProps {
  onMudarTela: (tela: string) => void;
}

export default function Categories({ onMudarTela }: CategoriesProps) {
  // Estados da Listagem
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔹 NOVOS ESTADOS: Controle do Modal e Formulário de Criação
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Estado inicial baseado no seu CategoryDto (name obrigatório, active obrigatório)
  const [formData, setFormData] = useState({
    name: '',
    active: true,
  });

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories'); 
      setCategories(response.data.data || []);
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

  // 🔹 NOVA FUNÇÃO: Envia a nova categoria para o Back-end
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        active: Boolean(formData.active),
      };

      await api.post('/categories', payload);

      // Sucesso: reseta os campos e fecha o modal
      setFormData({ name: '', active: true });
      setIsModalOpen(false);
      
      // Recarrega a tabela imediatamente
      carregarCategorias();
    } catch (err: any) {
      console.error(err);
      setFormError(
        err.response?.data?.message || 
        'Erro ao cadastrar categoria. Verifique se o campo foi preenchido corretamente.'
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <div className="action-buttons">
            <button className="btn-update" onClick={carregarCategorias}>🔄 Atualizar</button>
            {/* 🔹 NOVO BOTÃO: Abre o Modal de cadastro */}
            <button className="btn-add" onClick={() => setIsModalOpen(true)}>➕ Nova Categoria</button>
          </div>
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', color: '#94a3b8' }}>
                      Nenhuma categoria retornada do banco de dados.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td><code>{category.id}</code></td>
                      <td><strong>{category.name}</strong></td>
                      {/* Adicionado uma badge para exibir o status active que mapeamos no DTO */}
                      <td>
                        <span className={category.active !== false ? 'badge-active' : 'badge-inactive'}>
                          {category.active !== false ? 'Ativa' : 'Inativa'}
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

      {/* 🔹 NOVO COMPONENTE: Modal Centralizado para Cadastro de Categorias */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Nova Categoria</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            {formError && (
              <div className="form-error-alert">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleCreateCategory} className="category-form">
              <div className="form-group">
                <label>Nome da Categoria*</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChangeInput} 
                  required 
                  placeholder="Ex: Calças, Acessórios, Camisetas" 
                />
              </div>

              <div className="form-group">
                <label>Status Inicial*</label>
                <select name="active" value={String(formData.active)} onChange={handleChangeInput}>
                  <option value="true">Ativa (Disponível para uso)</option>
                  <option value="false">Inativa</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)} disabled={formLoading}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit" disabled={formLoading}>
                  {formLoading ? 'Salvando...' : 'Salvar Categoria'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}