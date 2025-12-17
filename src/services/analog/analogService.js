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

const MOCK_DATA = {
  analogsSearch: {
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
          number: 'RU2767088C1',
          title: 'Устройство для автоматизированной обработки данных',
          link: 'https://patents.google.com/patent/RU2767088C1',
          abstract: 'Изобретение относится к области вычислительной техники и может быть использовано для автоматизированной обработки больших объемов данных.',
          claims: 'Устройство для автоматизированной обработки данных, содержащее процессор, память и интерфейс ввода-вывода.'
        },
        1: {
          number: 'RU201434U1',
          title: 'Система управления базами данных',
          link: 'https://patents.google.com/patent/RU201434U1',
          abstract: 'Изобретение относится к системам управления базами данных и обеспечивает повышение скорости обработки запросов.',
          claims: 'Система управления базами данных, включающая модуль индексирования, модуль кэширования и модуль оптимизации запросов.'
        },
        2: {
          number: 'RU203509U1',
          title: 'Метод машинного обучения для классификации',
          link: 'https://patents.google.com/patent/RU203509U1',
          abstract: 'Изобретение относится к области искусственного интеллекта, в частности к методам машинного обучения.',
          claims: 'Метод машинного обучения, характеризующийся использованием нейронных сетей глубокого обучения для классификации данных.'
        }
      },
      timestamp: new Date().toISOString(),
      estimated_completion_time: null
    })
  },
  
  comparison: {
    createTask: (patentId) => ({
      message: 'Задача на сопоставление патента с аналогами создана',
      task_id: `compare_task_${Date.now()}`,
      status: TASK_STATUS.PENDING,
      created_at: new Date().toISOString()
    }),
    taskResult: (taskId) => ({
      status: TASK_STATUS.SUCCESS,
      message: TASK_STATUS_MESSAGES[TASK_STATUS.SUCCESS],
      task_id: taskId,
      data: {
        features: [
          'Тяговый рычаг, соединенный с тягачом.',
          'Крестообразный шарнир, содержащий горизонтальную ось и шкворень.',
          'Вилка-фланец, соединяющая элементы тягового устройства.',
          'Подвижный ползун.',
          'Силовой цилиндр, управляющий элементами тягового устройства.'
        ],
        analogs: [
          'RU2767088C1',
          'RU201434U1',
          'RU203509U1',
          'RU2811193C1',
          'RU2832365C1',
          'RU2842822C1',
          'RU203345U1',
          'RU2810832C1',
          'RU2842821C1'
        ],
        comparison: [
          ['+', '+', '+', '+', '-', '+', '+', '+', '-'],
          ['-', '+', '-', '-', '+', '-', '-', '+', '-'],
          ['+', '+', '-', '-', '+', '-', '-', '+', '+'],
          ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
          ['-', '-', '-', '+', '-', '+', '-', '+', '+']
        ],
        frequency: [78, 33, 56, 0, 44],
        user_patent: ['+', '+', '+', '+', '+'],
        user_comparison: [
          ['+', '+', '+', '+', '+', '-', '+', '+', '+'],
          ['+', '-', '+', '-', '-', '+', '-', '-', '+'],
          ['+', '+', '+', '-', '-', '+', '-', '-', '+'],
          ['+', '-', '-', '-', '-', '-', '-', '-', '-'],
          ['+', '-', '-', '-', '+', '-', '+', '-', '+']
        ],
        analog_counts: [2, 3, 1, 2, 2, 2, 1, 4, 2],
        
        analog_features: [
          'Тяговый рычаг, состоящий из передней и задней частей.',
          'Шарнир с поперечной горизонтальной осью, соединяющий переднюю и заднюю части тягового рычага.',
          'Вилка-фланец, закрепленная на задней части автомобиля-тягача.',
          'Шкворень, соединяющий переднюю часть тягового рычага с вилкой-фланцем шарнирно.',
          'Неподвижное соединение шкворня с передней частью тягового рычага.'
        ],
        patent_features: [
          'Тяговый рычаг, соединенный с тягачом через крестообразный шарнир.',
          'Крестообразный шарнир, содержащий горизонтальную ось и шкворень.',
          'Вилка-фланец, связывающая горизонтальную ось с тяговым рычагом.',
          'Подвижный ползун, установленный на верхней проушине вилки-фланца.',
          'Силовой цилиндр, управляющий перемещением подвижного ползуна.'
        ]
      },
      timestamp: new Date().toISOString()
    })
  }
}

class AnalogService {
  async createAnalogLink(patentId) {
    if (USE_MOCK) {
      return MOCK_DATA.analogsSearch.createTask(patentId)
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
      return MOCK_DATA.analogsSearch.taskResult(taskId)
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

  async createAnalogCompare(patentId) {
    if (USE_MOCK) {
      return MOCK_DATA.comparison.createTask(patentId)
    }

    const response = await authService.authenticatedFetch(
      API_ANALOG_ENDPOINTS.ANALOG_COMPARE,
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

  async getCompareResult(taskId) {
    if (USE_MOCK) {
      return MOCK_DATA.comparison.taskResult(taskId)
    }

    const response = await authService.authenticatedFetch(
      API_ANALOG_ENDPOINTS.ANALOG_COMPARE_RESULT(taskId),
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