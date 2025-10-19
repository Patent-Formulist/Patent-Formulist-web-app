import React, { useState } from 'react';
import '../styles/Auth.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message, "Вход выполнен успешно");
      } else {
        setErrorMessage(data.detail, "Неверный email или пароль");
      }
    } catch (error) {
      setErrorMessage("Ошибка сети");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <h1>Вход</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Электронная почта</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <p className="register-prompt">
          Не зарегистрированы?{' '}
          <Link to="/registration" className="register-link">
            Зарегистрируйтесь
          </Link>
        </p>
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
      {successMessage && <div className="auth-message">{successMessage}</div>}
      {errorMessage && <div className="auth-error">{errorMessage}</div>}
    </div>
  );
}

export default Login;