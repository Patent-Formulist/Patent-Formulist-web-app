import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import patentService from '../../services/patent/patentService'
import styles from './styles/PatentAnalogLayout.module.css'


export default function PatentAnalogLayout() {
  const { id } = useParams()
  const [patent, setPatent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


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
        <button className={styles.actionButton}>
          Провести патентный поиск
        </button>
        <button className={styles.actionButton}>
          Вывести аналоги
        </button>
        <button className={styles.actionButton}>
          Выбрать прототип
        </button>
      </div>
      {/* здесь потом будет контент для поиска аналогов */}
    </div>
  )
}