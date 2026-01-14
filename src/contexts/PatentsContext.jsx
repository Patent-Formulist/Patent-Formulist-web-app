import { createContext, useState, useContext, useCallback } from 'react'
import patentService from '../services/patent/patentService'
import { useToast } from './ToastContext'

const PatentsContext = createContext()

export function PatentsProvider({ children }) {
  const [patents, setPatents] = useState([])
  const [loading, setLoading] = useState(false)

  const loadPatents = useCallback(async () => {
    setLoading(true)
    try {
      const data = await patentService.getUserPatents()
      setPatents(data)
    } catch (e) {
      showError(error.message || 'Ошибка загрузки патентов')
    } finally {
      setLoading(false)
    }
  }, [])

  const createPatent = useCallback(async (patentData) => {
    const response = await patentService.createPatent(patentData)
    await loadPatents()
    return response
  }, [loadPatents])

  const deletePatent = useCallback(async (patentId) => {
    await patentService.deletePatent(patentId)
    await loadPatents()
  }, [loadPatents])

  const value = {
    patents,
    loading,
    loadPatents,
    createPatent,
    deletePatent
  }

  return (
    <PatentsContext.Provider value={value}>
      {children}
    </PatentsContext.Provider>
  )
}

export function usePatents() {
  const context = useContext(PatentsContext)
  if (!context) {
    throw new Error('usePatents must be used within PatentsProvider')
  }
  return context
}