import { v4 as uuidv4 } from 'uuid';

import { API_AUTH_ENDPOINTS } from '../apiConfig';

class AuthService {
    getDeviceId() {
        let deviceId = localStorage.getItem('device_id');

        if (!deviceId) {
            deviceId = uuidv4();
            localStorage.setItem('device_id', deviceId);
        }

        return deviceId;
    }

    async login(login, password) {
        const response = await fetch(
            API_AUTH_ENDPOINTS.LOGIN, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-device-id': this.getDeviceId()
                },
                body: JSON.stringify({ login, password }),
            }
        );

        let data = '';
        try {
            data = await response.json();
            console.log('Ответ сервера:', data)
        } catch {
            throw new Error('Ошибка парсинга ответа');
        }

        if (!response.ok) {
            if (response.status === 422 && data.detail) {
                throw new Error(
                    Array.isArray(data.detail) ? data.detail.map(d => d.msg).join('; ') : data.detail
                );
            }
            throw new Error('Неверный логин или пароль');
        }

        return data;
    }

    async register(login, password) {
        const response = await fetch(
            API_AUTH_ENDPOINTS.REGISTER, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-device-id': this.getDeviceId()
                },
                body: JSON.stringify({ login, password }),
            }
        );

        let data = '';
        try {
            data = await response.json();
            console.log('Ответ сервера:', data)
        } catch {
            throw new Error('Ошибка парсинга ответа');
        }

        if (!response.ok) {
            if (response.status === 422 && data.detail) {
                throw new Error(
                    Array.isArray(data.detail) ? data.detail.map(d => d.msg).join('; ') : data.detail
                );
            }
            throw new Error('Ошибка регистрации');
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