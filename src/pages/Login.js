import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function sanitizeInput(input) {
  return input.replace(/[<>"'`;()&]/g, '');
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const mockLoginApi = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password123') {
          resolve({ success: true, token: 'fake-jwt-token' });
        } else {
          reject(new Error('Неверный email или пароль'));
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

    try {
      const response = await mockLoginApi(cleanEmail, cleanPassword);
      setSuccessMessage('Успешный вход! Токен: ' + response.token);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <main className="login-page">
      <h1>Вход в систему</h1>

      {errorMessage && <p className="login-error">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Электронная почта</label>
        <input
          type="email"
          id="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <p className="register-prompt">
            Не зарегистрированы?{' '}
            <Link to="/registration" className="register-link">
                Зарегистрируйтесь
            </Link>
        </p>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      {successMessage && <p className="login-success">{successMessage}</p>}
    </main>
  );
}

export default Login;
