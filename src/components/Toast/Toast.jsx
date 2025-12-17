import { useEffect, useState } from 'react'
import styles from './Toast.module.css'
import plusIcon from '../../resources/plus.svg'


export const TOAST_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}


export default function Toast({ message, type = TOAST_TYPES.WARNING, duration = 3000, toastId, onClose }) {
  const [progress, setProgress] = useState(100)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)

      if (remaining === 0) {
        clearInterval(interval)
        handleClose()
      }
    }, 10)

    return () => clearInterval(interval)
  }, [toastId, duration])

  return (
    <div className={`${styles.toast} ${styles[type]} ${isClosing ? styles.closing : ''}`}>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Закрыть">
          <img src={plusIcon} alt="Закрыть" className={styles.closeIcon} />
        </button>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progress} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}