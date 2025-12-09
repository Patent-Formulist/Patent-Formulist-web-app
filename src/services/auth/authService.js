import { API_AUTH_ENDPOINTS } from '../apiConfig';

class AuthService {
  saveTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  async login(email, password) {
    const response = await fetch(API_AUTH_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('Ошибка сервера');
      }
      throw new Error('Неверный логин или пароль');
    }

    const data = await response.json();
    this.saveTokens(data.access, data.refresh);
    return data;
  }

  async register(email, password) {
    const response = await fetch(API_AUTH_ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Попробуйте другую почту');
        case 422:
          throw new Error('Введите почту в формате user@example.com');
        default:
          throw new Error('Ошибка сервера');
      }
    }

    const data = await response.json();
    this.saveTokens(data.access, data.refresh);
    return data;
  }

  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const response = await fetch(API_AUTH_ENDPOINTS.REFRESH, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      this.clearTokens();
      window.location.href = '/login';
      throw new Error('Refresh failed');
    }

    const data = await response.json();
    this.saveTokens(data.access, data.refresh);
    return data.access;
  }

  async logout() {
    try {
      const token = this.getAccessToken();
      if (token) {
        await fetch(API_AUTH_ENDPOINTS.LOGOUT, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } finally {
      this.clearTokens();
      window.location.href = '/login';
    }
  }

  async validate() {
    const token = this.getAccessToken();
    if (!token) return false;

    const response = await fetch(API_AUTH_ENDPOINTS.VALIDATE, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  }

  async authenticatedFetch(url, options = {}) {
    let token = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!token && refreshToken) {
      try {
        token = await this.refreshAccessToken();
      } catch (e) {
        window.location.href = '/login';
        throw e;
      }
    }

    const baseHeaders = {
      ...options.headers,
    };

    if (token) {
      baseHeaders.Authorization = `Bearer ${token}`;
    }

    if (!('Content-Type' in baseHeaders) && options.body) {
      baseHeaders['Content-Type'] = 'application/json';
    }

    const config = {
      ...options,
      headers: baseHeaders,
    };

    let response = await fetch(url, config);

    if (response.status === 401 && !options._isRetry && refreshToken) {
      try {
        const newAccess = await this.refreshAccessToken();
        const retryConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccess}`,
          },
          _isRetry: true,
        };
        response = await fetch(url, retryConfig);
      } catch (error) {
        window.location.href = '/login';
        throw error;
      }
    }

    return response;
  }
}

export default new AuthService();