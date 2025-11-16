import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import "../../styles/auth_styles/Auth.css"

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
            const params = new URLSearchParams()
            params.append('username', email)
            params.append('password', password)

            const response = await fetch('http://localhost:8000/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params,  
            })

            let data = {}
            try {
                data = await response.json()
            } catch {
                // JSON невалидный
            }

            if (response.ok && data.access_token) {
                localStorage.setItem('access_token', data.access_token)
                navigate('/')
            } else {
                setErrorMessage(data.detail || 'Неверный email или пароль')
            }
        } catch {
            setErrorMessage('Ошибка сети')
        } finally {
            setLoading(false)
        }
    };

    return(
        <div className="auth-page">
            <h1>Вход</h1>
            
            <form className="auth-form" onSubmit={handleSubmit}>
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
                
                <p className="auth-prompt">
                    Не зарегистрированы?{' '}
                    <Link to="/signin" className="auth-link">
                        Зарегистрируйтесь
                    </Link>
                </p>

                <button type="submit" className="auth-btn" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Войти'}
                </button>
            </form>

            <div className={errorMessage && "auth-error"} aria-live="polite" role="alert">
                {errorMessage || '\u00A0'}
            </div>
        </div>
    )
}

export default LogIn