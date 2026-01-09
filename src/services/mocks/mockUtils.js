import { APP_CONFIG } from '../appConfig'

export const mockDelay = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, APP_CONFIG.MOCK_DELAY)
  })
}

export const mockError = (message, delay = APP_CONFIG.MOCK_DELAY) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(message))
    }, delay)
  })
}

export class MockTaskManager {
  constructor() {
    this.tasks = {}
  }

  createTask(taskId, patentId, type, duration = 3000) {
    this.tasks[taskId] = {
      taskId,
      patentId,
      type,
      status: 'running',
      progress: 0,
      data: null,
      error: null,
      startTime: Date.now()
    }

    return taskId
  }

  completeTask(taskId, data) {
    if (this.tasks[taskId]) {
      this.tasks[taskId].status = 'success'
      this.tasks[taskId].progress = 100
      this.tasks[taskId].data = data
    }
  }

  failTask(taskId, error) {
    if (this.tasks[taskId]) {
      this.tasks[taskId].status = 'failed'
      this.tasks[taskId].error = error
    }
  }

  getTask(taskId) {
    return this.tasks[taskId] || null
  }

  deleteTask(taskId) {
    delete this.tasks[taskId]
  }
}

export const globalMockTaskManager = new MockTaskManager()