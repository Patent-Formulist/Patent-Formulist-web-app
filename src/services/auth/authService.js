import { API_AUTH_ENDPOINTS } from '../apiConfig';

class AuthService {

    async login(email, password) {

        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        const response = await fetch(
            API_AUTH_ENDPOINTS.LOGIN, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params,
            }
        );

        let data = {};
        try {
            data = await response.json();
        } catch {
            throw new Error('Ошибка парсинга ответа');
        }

        if (!response.ok) {
            throw new Error(data.detail || 'Неверный email или пароль');;
        }

        if (!data.access_token) {
            throw new Error('Токен не получен');
        }

        return data;
    }

    async register(email, password) {

        const response = await fetch(
            API_AUTH_ENDPOINTS.REGISTER, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            }
        );

        let data = {};
        try {
            data = await response.json();
        } catch {}

        if (!response.ok) {
            throw new Error(
                (data.detail && typeof data.detail === 'string')
                ? data.detail
                : 'Ошибка регистрации'
            );
        }

        return data;
    }

    saveToken(token) {
        localStorage.setItem('access_token', token);
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    removeToken() {
        localStorage.removeItem('access_token');
    }
}

export default new AuthService();