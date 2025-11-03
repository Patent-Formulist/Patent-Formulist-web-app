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
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await fetch('http://localhost:8000/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      setSuccessMessage('Вход выполнен успешно');
      setErrorMessage('');
    } else {
      setErrorMessage(data.detail);
      setSuccessMessage('');
    }
  } catch {
    setErrorMessage('Ошибка сети');
    setSuccessMessage('');
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