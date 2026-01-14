import { APP_CONFIG } from '../appConfig'
import { MOCK_ANALOGS, MOCK_COMPARISON, MOCK_PROTOTYPES, generateMockTaskId } from '../mocks/mockData'
import { mockDelay, globalMockTaskManager } from '../mocks/mockUtils'
import { API_REFERENCE_ENDPOINTS } from '../apiConfig'
import authService from '../auth/authService'

export const TASK_STATUS = {
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
}

export const TASK_STATUS_MESSAGES = {
  [TASK_STATUS.RUNNING]: 'Выполняется...',
  [TASK_STATUS.SUCCESS]: 'Готово',
  [TASK_STATUS.FAILED]: 'Ошибка',
  [TASK_STATUS.CANCELLED]: 'Отменено'
}

class ReferenceService {
  async createAnalogLink(patentId) {
    if (APP_CONFIG.USE_OFFLINE_MODE) {
      await mockDelay(null)
      const taskId = generateMockTaskId('analog')
      
      globalMockTaskManager.createTask(taskId, patentId, 'analogs')
      
      setTimeout(() => {
        const analogsData = MOCK_ANALOGS[patentId] || MOCK_ANALOGS['1']
        globalMockTaskManager.completeTask(taskId, analogsData)
      }, 3000)
      
      return { task_id: taskId }
    }

    const response = await authService.authenticatedFetch(
      API_REFERENCE_ENDPOINTS.ANALOG_CREATE_LINK,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ patent_id: patentId }),
      }
    )

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error('Патент не найден')
        case 400:
          throw new Error('Неверный запрос')
        default:
          throw new Error('Ошибка создания задачи')
      }
    }

    const data = await response.json()
    return data
  }

  async getTaskResult(taskId) {
    if (APP_CONFIG.USE_OFFLINE_MODE) {
      await mockDelay(null)
      const task = globalMockTaskManager.getTask(taskId)
      
      if (!task) {
        return {
          status: TASK_STATUS.FAILED,
          message: 'Задача не найдена',
          task_id: taskId
        }
      }
      
      if (task.status === 'success') {
        return {
          status: TASK_STATUS.SUCCESS,
          message: 'Готово',
          task_id: taskId,
          data: task.data
        }
      }
      
      if (task.status === 'failed') {
        return {
          status: TASK_STATUS.FAILED,
          message: task.error || 'Ошибка выполнения',
          task_id: taskId
        }
      }
      
      return {
        status: TASK_STATUS.RUNNING,
        message: 'Выполняется...',
        task_id: taskId,
        progress: task.progress
      }
    }

    const response = await authService.authenticatedFetch(
      API_REFERENCE_ENDPOINTS.ANALOG_GET_RESULT(taskId),
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    )

    if (!response.ok) {
      throw new Error('Ошибка получения результата')
    }

    const data = await response.json()
    return data
  }

  async createAnalogCompare(patentId) {
    if (APP_CONFIG.USE_OFFLINE_MODE) {
      await mockDelay(null)
      const taskId = generateMockTaskId('compare')
      
      globalMockTaskManager.createTask(taskId, patentId, 'compare')
      
      setTimeout(() => {
        const comparisonData = MOCK_COMPARISON[patentId] || MOCK_COMPARISON['1']
        globalMockTaskManager.completeTask(taskId, comparisonData)
      }, 4000)
      
      return { task_id: taskId }
    }

    const response = await authService.authenticatedFetch(
      API_REFERENCE_ENDPOINTS.ANALOG_CREATE_COMPARE,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ patent_id: patentId }),
      }
    )

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error('Патент не найден')
        case 400:
          throw new Error('Сначала получите аналоги')
        default:
          throw new Error('Ошибка создания задачи сравнения')
      }
    }

    const data = await response.json()
    return data
  }

  async getCompareResult(taskId) {
    if (APP_CONFIG.USE_OFFLINE_MODE) {
      await mockDelay(null)
      const task = globalMockTaskManager.getTask(taskId)
      
      if (!task) {
        return {
          status: TASK_STATUS.FAILED,
          message: 'Задача не найдена',
          task_id: taskId
        }
      }
      
      if (task.status === 'success') {
        return {
          status: TASK_STATUS.SUCCESS,
          message: 'Готово',
          task_id: taskId,
          data: task.data
        }
      }
      
      if (task.status === 'failed') {
        return {
          status: TASK_STATUS.FAILED,
          message: task.error || 'Ошибка выполнения',
          task_id: taskId
        }
      }
      
      return {
        status: TASK_STATUS.RUNNING,
        message: 'Выполняется...',
        task_id: taskId,
        progress: task.progress
      }
    }

    const response = await authService.authenticatedFetch(
      API_REFERENCE_ENDPOINTS.ANALOG_GET_COMPARE_RESULT(taskId),
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    )

    if (!response.ok) {
      throw new Error('Ошибка получения результата сравнения')
    }

    const data = await response.json()
    return data
  }

  async createPrototypeTask(patentId) {
    if (APP_CONFIG.USE_OFFLINE_MODE) {
      await mockDelay(null)
      const taskId = generateMockTaskId('prototype')
      
      globalMockTaskManager.createTask(taskId, patentId, 'prototype')
      
      setTimeout(() => {
        const prototypeData = MOCK_PROTOTYPES[patentId] || MOCK_PROTOTYPES['1']
        globalMockTaskManager.completeTask(taskId, prototypeData)
      }, 3000)
      
      return { task_id: taskId }
    }

    const response = await authService.authenticatedFetch(
      API_REFERENCE_ENDPOINTS.PROTOTYPE_CREATE,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ patent_id: patentId }),
      }
    )

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error('Патент не найден')
        case 400:
          throw new Error('Сначала выполните сопоставление с аналогами')
        default:
          throw new Error('Ошибка создания задачи прототипа')
      }
    }

    const data = await response.json()
    return data
  }

  async getPrototypeResult(taskId) {
    if (APP_CONFIG.USE_OFFLINE_MODE) {
      await mockDelay(null)
      const task = globalMockTaskManager.getTask(taskId)
      
      if (!task) {
        return {
          status: TASK_STATUS.FAILED,
          message: 'Задача не найдена',
          task_id: taskId
        }
      }
      
      if (task.status === 'success') {
        return {
          status: TASK_STATUS.SUCCESS,
          message: 'Готово',
          task_id: taskId,
          data: task.data
        }
      }
      
      if (task.status === 'failed') {
        return {
          status: TASK_STATUS.FAILED,
          message: task.error || 'Ошибка выполнения',
          task_id: taskId
        }
      }
      
      return {
        status: TASK_STATUS.RUNNING,
        message: 'Выполняется...',
        task_id: taskId,
        progress: task.progress
      }
    }

    const response = await authService.authenticatedFetch(
      API_REFERENCE_ENDPOINTS.PROTOTYPE_GET_RESULT(taskId),
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    )

    if (!response.ok) {
      throw new Error('Ошибка получения результата прототипа')
    }

    const data = await response.json()
    return data
  }

  async setPrototype(patentId, prototypeNumber) {
    if (APP_CONFIG.USE_OFFLINE_MODE) {
      await mockDelay(null)
      MOCK_PROTOTYPES[patentId] = {
        prototype_number: prototypeNumber,
        selected_from_analogs: true
      }
      return MOCK_PROTOTYPES[patentId]
    }

    const response = await authService.authenticatedFetch(
      API_REFERENCE_ENDPOINTS.PROTOTYPE_SET,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          patent_id: patentId,
          prototype_number: prototypeNumber
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Ошибка установки прототипа')
    }

    const data = await response.json()
    return data
  }

  async getPrototype(patentId) {
    if (APP_CONFIG.USE_OFFLINE_MODE) {
      await mockDelay(null)
      const prototype = MOCK_PROTOTYPES[patentId]
      if (!prototype) {
        throw new Error('Прототип не установлен')
      }
      return prototype
    }

    const response = await authService.authenticatedFetch(
      API_REFERENCE_ENDPOINTS.PROTOTYPE_GET(patentId),
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Прототип не установлен')
      }
      throw new Error('Ошибка получения прототипа')
    }

    const data = await response.json()
    return data
  }
}

export default new ReferenceService()
