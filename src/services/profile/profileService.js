import { API_PROFILE_ENDPOINTS } from '../apiConfig'
import authService from '../auth/authService'

const USE_MOCK = true

const mockData = {
  profile: {
    name: 'Иван Иванов',
    about: 'Инженер-изобретатель',
    email: 'user@example.com',
    avatar: null
  },
  settings: {
    isExpert: true,
    aiModel: 'GPT-4',
    subscription: 'Базовая подписка'
  },
  models: [
    'GPT-4',
    'GPT-3.5 Turbo',
    'Claude 3 Opus',
    'Claude 3 Sonnet',
    'Gemini Pro',
    'LLaMA 3'
  ]
}

class ProfileService {
  async getProfile() {
    if (USE_MOCK) {
      return mockData.profile
    }

    const response = await authService.authenticatedFetch(
      API_PROFILE_ENDPOINTS.PROFILE_GET,
      {
        method: 'GET',
        headers: { Accept: 'application/json' }
      }
    )

    let rawBody
    try {
      rawBody = await response.text()
    } catch {
      throw new Error('Ошибка получения данных')
    }

    let data
    try {
      data = rawBody ? JSON.parse(rawBody) : null
    } catch {
      data = null
    }

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Неверный формат запроса')
        case 404:
          throw new Error('Профиль не найден')
        case 500:
          throw new Error('Внутренняя ошибка сервера')
        case 503:
          throw new Error('Сервис временно недоступен. Попробуйте позже.')
        default:
          throw new Error(data?.detail ?? 'Неизвестная ошибка')
      }
    }

    return data
  }

  async updateProfile(profileData) {
    if (USE_MOCK) {
      return { success: true, data: profileData }
    }

    const response = await authService.authenticatedFetch(
      API_PROFILE_ENDPOINTS.PROFILE_UPDATE,
      {
        method: 'PUT',
        headers: { Accept: 'application/json' },
        body: JSON.stringify(profileData)
      }
    )

    let rawBody
    try {
      rawBody = await response.text()
    } catch {
      throw new Error('Ошибка получения данных')
    }

    let data
    try {
      data = rawBody ? JSON.parse(rawBody) : null
    } catch {
      data = null
    }

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Неверный формат данных')
        case 404:
          throw new Error('Профиль не найден')
        case 422:
          throw new Error('Неверные данные профиля')
        case 500:
          throw new Error('Не удалось обновить профиль')
        case 503:
          throw new Error('Сервис временно недоступен')
        default:
          throw new Error(data?.detail ?? 'Неизвестная ошибка')
      }
    }

    return data
  }

  async uploadAvatar(file) {
    if (USE_MOCK) {
      return { success: true, avatarUrl: URL.createObjectURL(file) }
    }

    const formData = new FormData()
    formData.append('avatar', file)

    const response = await authService.authenticatedFetch(
      API_PROFILE_ENDPOINTS.PROFILE_UPLOAD_AVATAR,
      {
        method: 'POST',
        body: formData
      }
    )

    let rawBody
    try {
      rawBody = await response.text()
    } catch {
      throw new Error('Ошибка получения данных')
    }

    let data
    try {
      data = rawBody ? JSON.parse(rawBody) : null
    } catch {
      data = null
    }

    if (!response.ok) {
      throw new Error(data?.detail ?? 'Ошибка загрузки аватара')
    }

    return data
  }

  async getSettings() {
    if (USE_MOCK) {
      return mockData.settings
    }

    const response = await authService.authenticatedFetch(
      API_PROFILE_ENDPOINTS.SETTINGS_GET,
      {
        method: 'GET',
        headers: { Accept: 'application/json' }
      }
    )

    let rawBody
    try {
      rawBody = await response.text()
    } catch {
      throw new Error('Ошибка получения данных')
    }

    let data
    try {
      data = rawBody ? JSON.parse(rawBody) : null
    } catch {
      data = null
    }

    if (!response.ok) {
      throw new Error(data?.detail ?? 'Ошибка загрузки настроек')
    }

    return data
  }

  async updateSettings(settingsData) {
    if (USE_MOCK) {
      return { success: true, data: settingsData }
    }

    const response = await authService.authenticatedFetch(
      API_PROFILE_ENDPOINTS.SETTINGS_UPDATE,
      {
        method: 'PUT',
        headers: { Accept: 'application/json' },
        body: JSON.stringify(settingsData)
      }
    )

    let rawBody
    try {
      rawBody = await response.text()
    } catch {
      throw new Error('Ошибка получения данных')
    }

    let data
    try {
      data = rawBody ? JSON.parse(rawBody) : null
    } catch {
      data = null
    }

    if (!response.ok) {
      throw new Error(data?.detail ?? 'Ошибка обновления настроек')
    }

    return data
  }

  async getAvailableModels() {
    if (USE_MOCK) {
      return mockData.models
    }

    const response = await authService.authenticatedFetch(
      API_PROFILE_ENDPOINTS.MODELS_GET,
      {
        method: 'GET',
        headers: { Accept: 'application/json' }
      }
    )

    let rawBody
    try {
      rawBody = await response.text()
    } catch {
      throw new Error('Ошибка получения данных')
    }

    let data
    try {
      data = rawBody ? JSON.parse(rawBody) : null
    } catch {
      data = null
    }

    if (!response.ok) {
      throw new Error(data?.detail ?? 'Ошибка загрузки моделей')
    }

    return data
  }

  async getSubscriptionInfo() {
    if (USE_MOCK) {
      return {
        plan: 'Базовая подписка',
        expiresAt: '2025-12-31',
        isActive: true
      }
    }

    const response = await authService.authenticatedFetch(
      API_PROFILE_ENDPOINTS.SUBSCRIPTION_GET,
      {
        method: 'GET',
        headers: { Accept: 'application/json' }
      }
    )

    let rawBody
    try {
      rawBody = await response.text()
    } catch {
      throw new Error('Ошибка получения данных')
    }

    let data
    try {
      data = rawBody ? JSON.parse(rawBody) : null
    } catch {
      data = null
    }

    if (!response.ok) {
      throw new Error(data?.detail ?? 'Ошибка загрузки подписки')
    }

    return data
  }
}

export default new ProfileService()