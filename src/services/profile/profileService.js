class ProfileService {
  async getProfile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Иван Иванов',
          about: 'Инженер-изобретатель',
          email: 'user@example.com',
          avatar: null
        })
      }, 500)
    })
  }

  async updateProfile(profileData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: profileData })
      }, 1000)
    })
  }

  async uploadAvatar(file) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, avatarUrl: URL.createObjectURL(file) })
      }, 800)
    })
  }

  async getSettings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          isExpert: false,
          aiModel: 'GPT-4',
          subscription: 'Базовая подписка'
        })
      }, 500)
    })
  }

  async updateSettings(settingsData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: settingsData })
      }, 1000)
    })
  }

  async getAvailableModels() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          'GPT-4',
          'GPT-3.5 Turbo',
          'Claude 3 Opus',
          'Claude 3 Sonnet',
          'Gemini Pro',
          'LLaMA 3'
        ])
      }, 300)
    })
  }

  async getSubscriptionInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          plan: 'Базовая подписка',
          expiresAt: '2025-12-31',
          isActive: true
        })
      }, 400)
    })
  }
}

export default new ProfileService()