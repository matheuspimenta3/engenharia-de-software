import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Users from './pages/Users';

function App() {
  // O sistema começa bloqueado no ecrã de login
  // Estados possíveis: 'login' | 'dashboard' | 'produtos' | 'categorias' | 'usuarios'
  const [telaAtual, setTelaAtual] = useState<string>('login');

  // Função que o Login vai disparar para dar entrada no sistema
  const irParaDashboard = () => {
    setTelaAtual('dashboard');
  };

  return (
    <div>
      {/* 1. Ecrã de Login */}
      {telaAtual === 'login' && (
        <Login onLoginSuccess={irParaDashboard} />
      )}

      {/* 2. Ecrã do Dashboard */}
      {telaAtual === 'dashboard' && (
        <Dashboard onMudarTela={setTelaAtual} />
      )}

      {/* 3. Ecrã de Produtos (Lendo da API do Alexandre) */}
      {telaAtual === 'produtos' && (
        <Products onMudarTela={setTelaAtual} />
      )}

      {/* 4. Ecrã de Categorias (Lendo da API do Alexandre) */}
      {telaAtual === 'categorias' && (
        <Categories onMudarTela={setTelaAtual} />
      )}

      {/* 5. Ecrã de Usuários (Lendo da API do Alexandre) */}
      {telaAtual === 'usuarios' && (
        <Users onMudarTela={setTelaAtual} />
      )}
    </div>
  );
}

export default App;