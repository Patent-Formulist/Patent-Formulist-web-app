import React, { useState } from 'react';
import '../styles/Auth.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isEmailBasic = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailBasic(email)) {
      setError('Введите корректный e‑mail (например: ivan@site.ru).');
      setMessage('');
      return;
    }

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
      const res = await fetch('http://localhost:8000/auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      try { data = await res.json(); } catch { data = null; }

      if (res.ok) {
        setMessage((data && data.message) || 'Регистрация прошла успешно!');
        setError('');
      } else {
        const detail = data && (data.detail || data.errors);
        let msg = 'Ошибка регистрации';

        if (Array.isArray(detail)) {
          const emailErr = detail.find(
            (d) =>
              (Array.isArray(d.loc) && d.loc.includes('email')) ||
              (d.type && String(d.type).includes('email')) ||
              (d.msg && String(d.msg).toLowerCase().includes('email'))
          );
          if (emailErr) {
            msg = 'Введите корректный e‑mail (например: ivan@site.ru).';
          } else {
            msg = detail.map((d) => d.msg || d.type || 'Ошибка валидации').join(', ');
          }
        } else if (detail && typeof detail === 'object' && detail.email) {
          msg = detail.email;
        } else if (typeof detail === 'string') {
          msg = detail;
        }

        setError(msg);
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
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label>Электронная почта</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Подтвердите пароль</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">Зарегистрироваться</button>
      </form>
      <div className="auth-message" aria-live="polite">{message || '\u00A0'}</div>
      <div className="auth-error" aria-live="polite">{error || '\u00A0'}</div>
    </div>
  );
}

export default Registration;
