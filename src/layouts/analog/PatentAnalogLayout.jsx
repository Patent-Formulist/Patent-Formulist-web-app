import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import patentService from '../../services/patent/patentService'
import { useAnalogTask } from '../../contexts/AnalogTaskContext'
import { useToast } from '../../contexts/ToastContext'
import { TASK_STATUS } from '../../services/analog/analogService'
import styles from './styles/PatentAnalogLayout.module.css'

export default function PatentAnalogLayout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { showWarning } = useToast()
  const { getTask, getCompareTask } = useAnalogTask()
  
  const [patent, setPatent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const analogTask = getTask(id)
  const compareTask = getCompareTask(id)
  
  const isAnalogsCompleted = analogTask?.status === TASK_STATUS.SUCCESS && analogTask?.data
  const isCompareCompleted = compareTask?.status === TASK_STATUS.SUCCESS && compareTask?.data
  const isAnalogsRunning = analogTask?.status === TASK_STATUS.RUNNING
  const isCompareRunning = compareTask?.status === TASK_STATUS.RUNNING

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const data = await patentService.getPatent(id)
        if (isMounted) {
          setPatent(data)
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message || 'Ошибка загрузки патента')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [id])

  const isActive = (path) => {
    return location.pathname === `/workspace/patents/${id}${path}`
  }

  const handleNavigate = (path) => {
    if (path === '/attributes' && !isAnalogsCompleted) {
      showWarning('Сначала выполните поиск аналогов')
      return
    }
    if (path === '/prototype' && !isCompareCompleted) {
      showWarning('Сначала выполните сопоставление с аналогами')
      return
    }
    navigate(`/workspace/patents/${id}${path}`)
  }

  if (loading) {
    return <div className={styles.container}>Загрузка...</div>
  }

  if (error) {
    return <div className={styles.container}>{error}</div>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{patent?.name}</h2>
      <div className={styles.buttonContainer}>
        <button 
          className={`${styles.actionButton} ${isActive('/analogs') ? styles.activeButton : ''} ${isAnalogsRunning ? styles.loading : ''} ${isAnalogsCompleted ? styles.completed : ''}`}
          onClick={() => handleNavigate('/analogs')}
        >
          Поиск аналогов
        </button>
        <button 
          className={`${styles.actionButton} ${isActive('/attributes') ? styles.activeButton : ''} ${!isAnalogsCompleted ? styles.inactiveButton : ''} ${isCompareRunning ? styles.loading : ''} ${isCompareCompleted ? styles.completed : ''}`}
          onClick={() => handleNavigate('/attributes')}
        >
          Сопоставление с аналогами
        </button>
        <button 
          className={`${styles.actionButton} ${isActive('/prototype') ? styles.activeButton : ''} ${!isCompareCompleted ? styles.inactiveButton : ''}`}
          onClick={() => handleNavigate('/prototype')}
        >
          Выявление прототипа
        </button>
      </div>
      <Outlet />
    </div>
  )
}