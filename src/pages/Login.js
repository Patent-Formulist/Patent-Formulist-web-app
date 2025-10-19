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

    // мок логина
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password123') {
        setSuccessMessage('Вход выполнен успешно');
      } else {
        setErrorMessage('Неверный email или пароль');
      }
      setLoading(false);
    }, 1000);
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