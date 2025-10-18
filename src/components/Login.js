import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const validate = () => {
    let isValid = true;
    setLoginError('');
    setPasswordError('');
    setAuthMessage('');

    if (login.trim() === '') {
      setLoginError('Поле не может быть пустым');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Поле не может быть пустым');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Заглушка проверки
    const correctLogin = 'user';
    const correctPassword = '1234';

    if (login === correctLogin && password === correctPassword) {
      setAuthMessage('Успешная авторизация');
      setLoginError('');
      setPasswordError('');
    } else {
      setAuthMessage('Неуспешная авторизация');
      setLoginError('Введены неверные данные');
      setPasswordError('Введены неверные данные');
    }
  };

  return (
    <div className="login-container">
      <fieldset className="login-groupbox">
        <legend className="login-legend">Вход</legend>
        <form onSubmit={handleSubmit} noValidate className="login-form">
          <div>
            <label htmlFor="login" className="login-label">Логин</label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className={`login-input ${loginError ? 'error' : ''}`}
            />
            {loginError && (
              <div className="error-message">{loginError}</div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="login-label">Пароль</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`login-input ${passwordError ? 'error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>

          <button type="submit" className="submit-button">
            Войти
          </button>
        </form>

        {authMessage && (
          <div className={`auth-message ${authMessage === 'Успешная авторизация' ? 'success' : 'error'}`}>
            {authMessage}
          </div>
        )}

        <div className="signup-text">
          Не авторизованы? <Link to="/signup">Зарегистрироваться</Link>
        </div>
      </fieldset>
    </div>
  );
}

export default Login;
