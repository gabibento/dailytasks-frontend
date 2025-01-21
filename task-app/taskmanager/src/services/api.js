import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080", 
});
// Interceptor para adicionar o token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
