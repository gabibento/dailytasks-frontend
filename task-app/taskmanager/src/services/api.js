import axios from 'axios';

const api = axios.create({
  baseURL: "https://taskmanager-backend-production-84f5.up.railway.app/", 
});

export default api;
