import axios from 'axios';

// Aqui ficará a URL do servidor backend do Alexandre
const API_URL = 'http://localhost:3000'; 

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor profissional pronto para quando vocês colocarem Token de Autenticação JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@estoque:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});