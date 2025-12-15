import { API_ANALOG_ENDPOINTS } from '../apiConfig'
import authService from '../auth/authService'

const USE_MOCK = true

export const TASK_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
}

export const TASK_STATUS_MESSAGES = {
  [TASK_STATUS.PENDING]: 'Задача ожидает обработки',
  [TASK_STATUS.RUNNING]: 'Задача выполняется',
  [TASK_STATUS.SUCCESS]: 'Задача успешно завершена',
  [TASK_STATUS.FAILED]: 'Задача завершилась с ошибкой',
  [TASK_STATUS.CANCELLED]: 'Задача отменена'
}

const mockData = {
  createTask: (patentId) => ({
    message: 'Задача на поиск аналогов создана',
    chat_id: `chat_${Date.now()}`,
    task_id: `task_${Date.now()}`,
    status: TASK_STATUS.PENDING,
    status_url: `/ws/status/chat_${Date.now()}`,
    result_url: `/api/v1/analog/result/task_${Date.now()}`,
    created_at: new Date().toISOString(),
    estimated_completion_time: new Date(Date.now() + 300000).toISOString(),
    meta: {
      patent_id: patentId
    }
  }),
  taskResult: (taskId) => ({
    status: TASK_STATUS.SUCCESS,
    message: TASK_STATUS_MESSAGES[TASK_STATUS.SUCCESS],
    task_id: taskId,
    data: {
      0: {
        number: 'RU2745123C1',
        title: 'Устройство для автоматизированной обработки данных',
        link: 'https://patents.google.com/patent/RU2745123C1',
        abstract: 'Изобретение относится к области вычислительной техники и может быть использовано для автоматизированной обработки больших объемов данных.',
        claims: 'Устройство для автоматизированной обработки данных, содержащее процессор, память и интерфейс ввода-вывода.'
      },
      1: {
        number: 'RU2698456C2',
        title: 'Система управления базами данных',
        link: 'https://patents.google.com/patent/RU2698456C2',
        abstract: 'Изобретение относится к системам управления базами данных и обеспечивает повышение скорости обработки запросов.',
        claims: 'Система управления базами данных, включающая модуль индексирования, модуль кэширования и модуль оптимизации запросов.'
      },
      2: {
        number: 'RU2812345C1',
        title: 'Метод машинного обучения для классификации',
        link: 'https://patents.google.com/patent/RU2812345C1',
        abstract: 'Изобретение относится к области искусственного интеллекта, в частности к методам машинного обучения.',
        claims: 'Метод машинного обучения, характеризующийся использованием нейронных сетей глубокого обучения для классификации данных.'
      }
    },
    timestamp: new Date().toISOString(),
    estimated_completion_time: null
  })
}

class AnalogService {
  async createAnalogLink(patentId) {
    if (USE_MOCK) {
      return mockData.createTask(patentId)
    }

    const response = await authService.authenticatedFetch(
      API_ANALOG_ENDPOINTS.ANALOG_CREATE_LINK,
      {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({ patent_id: patentId })
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
          throw new Error('Неверный формат идентификатора патента')
        case 404:
          throw new Error('Патент не найден')
        case 422:
          throw new Error('Неверный формат данных')
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

  async getTaskResult(taskId) {
    if (USE_MOCK) {
      return mockData.taskResult(taskId)
    }

    const response = await authService.authenticatedFetch(
      API_ANALOG_ENDPOINTS.ANALOG_GET_RESULT(taskId),
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
          throw new Error('Неверный формат идентификатора задачи')
        case 404:
          throw new Error('Задача не найдена')
        case 422:
          throw new Error('Неверный формат UUID')
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

  async pollTaskUntilComplete(taskId, intervalMs = 2000, maxAttempts = 150) {
    let attempts = 0
    
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        attempts++
        
        if (attempts >= maxAttempts) {
          clearInterval(interval)
          reject(new Error('Превышено максимальное время ожидания'))
          return
        }
        
        try {
          const result = await this.getTaskResult(taskId)
          
          if (result.status === TASK_STATUS.SUCCESS) {
            clearInterval(interval)
            resolve(result)
          } else if (result.status === TASK_STATUS.FAILED || result.status === TASK_STATUS.CANCELLED) {
            clearInterval(interval)
            reject(new Error(result.message || TASK_STATUS_MESSAGES[result.status]))
          }
        } catch (error) {
          clearInterval(interval)
          reject(error)
        }
      }, intervalMs)
    })
  }


  getStatusMessage(status) {
    return TASK_STATUS_MESSAGES[status] || 'Неизвестный статус'
  }
}

export default new AnalogService()