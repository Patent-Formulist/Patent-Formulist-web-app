import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import referenceService, { TASK_STATUS } from '../services/reference/referenceService'

const ReferenceContext = createContext()

const STORAGE_KEY_ANALOGS = 'analog_tasks'
const STORAGE_KEY_COMPARE = 'compare_tasks'

export function ReferenceProvider({ children }) {
  const [analogTasks, setAnalogTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ANALOGS)
    return saved ? JSON.parse(saved) : {}
  })

  const [compareTasks, setCompareTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_COMPARE)
    return saved ? JSON.parse(saved) : {}
  })

  const analogIntervalsRef = useRef({})
  const compareIntervalsRef = useRef({})

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ANALOGS, JSON.stringify(analogTasks))
  }, [analogTasks])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COMPARE, JSON.stringify(compareTasks))
  }, [compareTasks])

  useEffect(() => {
    Object.entries(analogTasks).forEach(([patentId, task]) => {
      if (task.status === TASK_STATUS.RUNNING && !analogIntervalsRef.current[patentId]) {
        restoreAnalogPolling(patentId, task.taskId)
      }
    })

    Object.entries(compareTasks).forEach(([patentId, task]) => {
      if (task.status === TASK_STATUS.RUNNING && !compareIntervalsRef.current[patentId]) {
        restoreComparePolling(patentId, task.taskId)
      }
    })
  }, [])

  const restoreAnalogPolling = useCallback((patentId, taskId) => {
    analogIntervalsRef.current[patentId] = setInterval(async () => {
      try {
        const result = await referenceService.getTaskResult(taskId)

        if (result.status === TASK_STATUS.SUCCESS) {
          clearInterval(analogIntervalsRef.current[patentId])
          delete analogIntervalsRef.current[patentId]

          setAnalogTasks(prev => ({
            ...prev,
            [patentId]: {
              taskId,
              status: TASK_STATUS.SUCCESS,
              data: result.data,
              error: null
            }
          }))
        } else if (result.status === TASK_STATUS.FAILED || result.status === TASK_STATUS.CANCELLED) {
          clearInterval(analogIntervalsRef.current[patentId])
          delete analogIntervalsRef.current[patentId]

          setAnalogTasks(prev => ({
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
        clearInterval(analogIntervalsRef.current[patentId])
        delete analogIntervalsRef.current[patentId]

        setAnalogTasks(prev => ({
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

  const restoreComparePolling = useCallback((patentId, taskId) => {
    compareIntervalsRef.current[patentId] = setInterval(async () => {
      try {
        const result = await referenceService.getCompareResult(taskId)

        if (result.status === TASK_STATUS.SUCCESS) {
          clearInterval(compareIntervalsRef.current[patentId])
          delete compareIntervalsRef.current[patentId]

          setCompareTasks(prev => ({
            ...prev,
            [patentId]: {
              taskId,
              status: TASK_STATUS.SUCCESS,
              data: result.data,
              error: null
            }
          }))
        } else if (result.status === TASK_STATUS.FAILED || result.status === TASK_STATUS.CANCELLED) {
          clearInterval(compareIntervalsRef.current[patentId])
          delete compareIntervalsRef.current[patentId]

          setCompareTasks(prev => ({
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
        clearInterval(compareIntervalsRef.current[patentId])
        delete compareIntervalsRef.current[patentId]

        setCompareTasks(prev => ({
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

  const startAnalogTask = useCallback(async (patentId) => {
    try {
      const createResponse = await referenceService.createAnalogLink(patentId)
      const taskId = createResponse.task_id

      setAnalogTasks(prev => ({
        ...prev,
        [patentId]: {
          taskId,
          status: TASK_STATUS.RUNNING,
          data: null,
          error: null
        }
      }))

      if (analogIntervalsRef.current[patentId]) {
        clearInterval(analogIntervalsRef.current[patentId])
      }

      restoreAnalogPolling(patentId, taskId)

      return taskId
    } catch (error) {
      setAnalogTasks(prev => ({
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
  }, [restoreAnalogPolling])

  const startCompareTask = useCallback(async (patentId) => {
    try {
      const createResponse = await referenceService.createAnalogCompare(patentId)
      const taskId = createResponse.task_id

      setCompareTasks(prev => ({
        ...prev,
        [patentId]: {
          taskId,
          status: TASK_STATUS.RUNNING,
          data: null,
          error: null
        }
      }))

      if (compareIntervalsRef.current[patentId]) {
        clearInterval(compareIntervalsRef.current[patentId])
      }

      restoreComparePolling(patentId, taskId)

      return taskId
    } catch (error) {
      setCompareTasks(prev => ({
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
  }, [restoreComparePolling])

  const getAnalogTask = useCallback((patentId) => {
    return analogTasks[patentId]
  }, [analogTasks])

  const getCompareTask = useCallback((patentId) => {
    return compareTasks[patentId]
  }, [compareTasks])

  const clearAnalogTask = useCallback((patentId) => {
    if (analogIntervalsRef.current[patentId]) {
      clearInterval(analogIntervalsRef.current[patentId])
      delete analogIntervalsRef.current[patentId]
    }
    setAnalogTasks(prev => {
      const newTasks = { ...prev }
      delete newTasks[patentId]
      return newTasks
    })
  }, [])

  const clearCompareTask = useCallback((patentId) => {
    if (compareIntervalsRef.current[patentId]) {
      clearInterval(compareIntervalsRef.current[patentId])
      delete compareIntervalsRef.current[patentId]
    }
    setCompareTasks(prev => {
      const newTasks = { ...prev }
      delete newTasks[patentId]
      return newTasks
    })
  }, [])

  const clearTaskForPatent = useCallback((patentId) => {
    clearAnalogTask(patentId)
    clearCompareTask(patentId)
  }, [clearAnalogTask, clearCompareTask])

  return (
    <ReferenceContext.Provider value={{ 
      startTask: startAnalogTask,
      getTask: getAnalogTask, 
      clearTask: clearAnalogTask,
      startCompareTask,
      getCompareTask,
      clearCompareTask,
      clearTaskForPatent,  
      analogTasks,
      compareTasks
    }}>
      {children}
    </ReferenceContext.Provider>
  )
}

export function useReference() {
  const context = useContext(ReferenceContext)
  if (!context) {
    throw new Error('useAnalogTask must be used within AnalogTaskProvider')
  }
  return context
}