import { createContext, useContext, useState, useCallback, useRef } from 'react'
import Toast, { TOAST_TYPES } from '../components/Toast/Toast'
import styles from '../components/Toast/ToastContainer.module.css'


const ToastContext = createContext()

const MAX_TOASTS = 5


export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const removeToastRef = useRef()

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  removeToastRef.current = removeToast

  const showToast = useCallback((message, type = TOAST_TYPES.WARNING, duration = 3000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => {
      const newToasts = [{ id, message, type, duration }, ...prev]
      return newToasts.slice(0, MAX_TOASTS)
    })
  }, [])

  const showSuccess = useCallback((message, duration) => {
    showToast(message, TOAST_TYPES.SUCCESS, duration)
  }, [showToast])

  const showWarning = useCallback((message, duration) => {
    showToast(message, TOAST_TYPES.WARNING, duration)
  }, [showToast])

  const showError = useCallback((message, duration) => {
    showToast(message, TOAST_TYPES.ERROR, duration)
  }, [showToast])

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showWarning, showError }}>
      {children}
      <div className={styles.toastContainer}>
        {toasts.map((toast, index) => (
          <div key={toast.id} className={styles.toastWrapper} style={{ top: `${60 + index * 76}px` }}>
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              toastId={toast.id}
              onClose={() => removeToastRef.current(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}


export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}