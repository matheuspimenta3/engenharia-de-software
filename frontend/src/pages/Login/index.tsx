import React, { useState } from 'react';
import './login.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função direta e sem travas para o botão
  const tentarLogar = () => {
    // Se digitou qualquer coisa nos dois campos, libera!
    if (email.trim() !== '' && password.trim() !== '') {
      onLoginSuccess();
    } else {
      alert('Por favor, digite qualquer e-mail e qualquer senha para testar.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Blackout Vestuário</h2>
        <p>Insira suas credenciais para acessar o estoque</p>
        
        {/* Usamos onSubmit apenas para evitar que a página recarregue ao apertar Enter */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" 
              placeholder="seuemail@blackout.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {/* O segredo: adicionamos o onClick direto no botão chamando a função */}
          <button type="button" className="btn-login" onClick={tentarLogar}>
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}