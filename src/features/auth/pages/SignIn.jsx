import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import authService from '../../../services/auth/authService';

import styles from '../styles/Auth.module.css';

function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loginRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (login.length < 5) {
        setErrorMessage('Логин должен быть не менее 5 символов');
        loginRef.current && loginRef.current.focus();
        setLoading(false);
        return;
    }
    if (password.length < 8) {
        setErrorMessage('Пароль должен быть не менее 8 символов');
        setLoading(false);
        return;
    }
    if (password !== confirmPassword) {
        setErrorMessage('Пароли не совпадают');
        setLoading(false);
        return;
    }

    try {
        await authService.register(login, password); 
        navigate('/workspace');
    } catch (error) {
        setErrorMessage(error.message || 'Ошибка сети');
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1>Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="signup-login">Почта</label>
        <input
          id="signup-login"
          type="text"
          placeholder="Введите почту"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          ref={loginRef}
          required
        />
        <label htmlFor="signup-password">Пароль</label>
        <input
          id="signup-password"
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="signup-confirm-password">Повторите пароль</label>
        <input
          id="signup-confirm-password"
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          aria-required="true"
        />
        <p className={styles.prompt}>
          Уже зарегистрированы?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
      <div className={errorMessage ? styles.error : styles.errorPlaceholder} role="alert">
        {errorMessage || '\u00A0'}
      </div>
    </div>
  )
}

export default SignIn