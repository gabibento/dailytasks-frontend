import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password }); // Endpoint de login no backend
      const token = response.data; // Supondo que o token JWT vem no campo 'token'
      localStorage.setItem('authToken', token); // Armazena o token no localStorage

      console.log(token); // Confirme o que o backend retorna
      console.log(localStorage.getItem('authToken'))
      
      navigate('/')
    } catch (err) {
      setError('Username or password invalid');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
