import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import authService from '../../../services/api/authService'

import styles from "../styles/Auth.module.css"

function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const data = await authService.login(email, password)
      authService.saveToken(data.access_token)
      navigate('/workspace')
    } catch (error) {
      setErrorMessage(error.message || 'Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pages}>
      <h1>Вход</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="login-email">Электронная почта</label>
        <input
          id="login-email"
          type="email"
          placeholder='Введите электронную почту'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label htmlFor="login-password">Пароль</label>
        <input
          id="login-password"
          type="password"
          placeholder='Введите пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <p className={styles.prompt}>
          Не зарегистрированы?{' '}
          <Link to="/signin" className={styles.link}>
            Зарегистрируйтесь
          </Link>
        </p>

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>

      <div className={errorMessage ? styles.error : styles.errorPlaceholder} aria-live="polite" role="alert">
        {errorMessage || '\u00A0'}
      </div>
    </div>
  )
}

export default LogIn