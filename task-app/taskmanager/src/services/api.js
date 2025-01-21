import axios from 'axios';

const api = axios.create({
  baseURL: "https://taskmanager-backend-production-84f5.up.railway.app/", 
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
