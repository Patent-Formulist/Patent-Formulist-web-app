import React, { useState } from 'react';
import '../styles/Auth.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError('Пароли не совпадают');
    setMessage('');
    return;
  }

  if (password.length < 8) {
    setError('Пароль должен быть не менее 8 символов');
    setMessage('');
    return;
  }

  if (!/\d/.test(password) || !/[A-Z]/.test(password)) {
    setError('Пароль должен содержать хотя бы одну цифру и заглавную букву');
    setMessage('');
    return;
  }

  setError('');
  setMessage('');

  try {
    const response = await fetch('http://localhost:8000/auth/', {  
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({})); 
      setMessage(data.message);
      setError('');
    } else {
      const errorData = await response.json();
      setError(errorData.detail);
      setMessage('');
    }
  } catch {
    setError('Ошибка сети');
    setMessage('');
  }
};

  return (
    <div className="auth-page">
      <h1>Регистрация</h1>
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
        <label>Подтвердите пароль</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">Зарегистрироваться</button>
      </form>
      {message && <div className="auth-message">{message}</div>}
      {error && <div className="auth-error">{error}</div>}
    </div>
  );
}

export default Registration;