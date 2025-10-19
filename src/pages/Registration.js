import React, { useState } from 'react';
import '../styles/Registration.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают');
      return;
    }
    // логика регистрации (фейковая)
    setMessage('Регистрация прошла успешно!');
  };

  return (
    <main className="register-page">
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="email">Электронная почта</label>
        <input
          type="email"
          id="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Подтвердите пароль</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-btn">Зарегистрироваться</button>
      </form>

      {message && <p className="register-message">{message}</p>}
    </main>
  );
}

export default Registration;
