import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../styles/Auth.css";

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const emailRef = useRef(null)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage('Введите корректный e‑mail в формате adress@site.ru')
      emailRef.current && emailRef.current.focus()
      setLoading(false)
      return
    }
    if (password.length < 8) {
      setErrorMessage('Пароль должен быть не менее 8 символов')
      setLoading(false)
      return
    }
    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8000/auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      let data = {};
      try { data = await response.json(); } catch {}

      if (response.ok) {
        navigate('/')
      } else {
        setErrorMessage((data.detail && typeof data.detail === 'string')
          ? data.detail
          : 'Ошибка регистрации')
      }
    } catch {
      setErrorMessage('Ошибка сети');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h1>Регистрация</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="signup-email">Электронная почта</label>
        <input
          id="signup-email"
          type="email"
          placeholder='Введите электронную почту'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="signup-password">Пароль</label>
        <input
          id="signup-password"
          type="password"
          placeholder='Введите пароль'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <label htmlFor="signup-confirm-password">Повторите пароль</label>
        <input
          id="signup-confirm-password"
          type="password"
          placeholder='Подтвердите пароль'
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          aria-required="true"
        />

        <p className="auth-prompt">
          Уже зарегистрированы?{' '}
          <Link to="/login" className="auth-link">
            Войти
          </Link>
        </p>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
 
      <div className={errorMessage && "auth-error"} role="alert">
        {errorMessage || '\u00A0'}
      </div>

      { successMessage && (<div className="auth-message" role="alert">{successMessage}</div>) }
    </div>
  );
}

export default SignIn;