import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import analogService, { TASK_STATUS } from '../services/analog/analogService'

const AnalogTaskContext = createContext()

const STORAGE_KEY = 'analog_tasks'

export function AnalogTaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  })
  const intervalsRef = useRef({})
  const removeToastRef = useRef()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    Object.entries(tasks).forEach(([patentId, task]) => {
      if (task.status === TASK_STATUS.RUNNING && !intervalsRef.current[patentId]) {
        restorePolling(patentId, task.taskId)
      }
    })
  }, [])

  const restorePolling = useCallback((patentId, taskId) => {
    intervalsRef.current[patentId] = setInterval(async () => {
      try {
        const result = await analogService.getTaskResult(taskId)

        if (result.status === TASK_STATUS.SUCCESS) {
          clearInterval(intervalsRef.current[patentId])
          delete intervalsRef.current[patentId]

          setTasks(prev => ({
            ...prev,
            [patentId]: {
              taskId,
              status: TASK_STATUS.SUCCESS,
              data: result.data,
              error: null
            }
          }))
        } else if (result.status === TASK_STATUS.FAILED || result.status === TASK_STATUS.CANCELLED) {
          clearInterval(intervalsRef.current[patentId])
          delete intervalsRef.current[patentId]

          setTasks(prev => ({
            ...prev,
            [patentId]: {
              taskId,
              status: result.status,
              data: null,
              error: result.message
            }
          }))
        }
      } catch (error) {
        clearInterval(intervalsRef.current[patentId])
        delete intervalsRef.current[patentId]

        setTasks(prev => ({
          ...prev,
          [patentId]: {
            taskId,
            status: TASK_STATUS.FAILED,
            data: null,
            error: error.message
          }
        }))
      }
    }, 2000)
  }, [])

  const startTask = useCallback(async (patentId) => {
    try {
      const createResponse = await analogService.createAnalogLink(patentId)
      const taskId = createResponse.task_id

      setTasks(prev => ({
        ...prev,
        [patentId]: {
          taskId,
          status: TASK_STATUS.RUNNING,
          data: null,
          error: null
        }
      }))

      if (intervalsRef.current[patentId]) {
        clearInterval(intervalsRef.current[patentId])
      }

      restorePolling(patentId, taskId)

      return taskId
    } catch (error) {
      setTasks(prev => ({
        ...prev,
        [patentId]: {
          taskId: null,
          status: TASK_STATUS.FAILED,
          data: null,
          error: error.message
        }
      }))
      throw error
    }
  }, [restorePolling])

  const getTask = useCallback((patentId) => {
    return tasks[patentId]
  }, [tasks])

  const clearTask = useCallback((patentId) => {
    if (intervalsRef.current[patentId]) {
      clearInterval(intervalsRef.current[patentId])
      delete intervalsRef.current[patentId]
    }
    setTasks(prev => {
      const newTasks = { ...prev }
      delete newTasks[patentId]
      return newTasks
    })
  }, [])

  const clearTaskForPatent = useCallback((patentId) => {
    if (intervalsRef.current[patentId]) {
      clearInterval(intervalsRef.current[patentId])
      delete intervalsRef.current[patentId]
    }
    
    setTasks(prev => {
      const newTasks = { ...prev }
      delete newTasks[patentId]
      return newTasks
    })
  }, [])

  return (
    <AnalogTaskContext.Provider value={{ startTask, getTask, clearTask, clearTaskForPatent, tasks }}>
      {children}
    </AnalogTaskContext.Provider>
  )
}

export function useAnalogTask() {
  const context = useContext(AnalogTaskContext)
  if (!context) {
    throw new Error('useAnalogTask must be used within AnalogTaskProvider')
  }
  return context
}