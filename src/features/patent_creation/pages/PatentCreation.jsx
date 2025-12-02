import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePatents } from '../../../contexts/PatentsContext'
import styles from '../styles/PatentCreation.module.css'

export default function PatentCreation() {
  const [name, setName] = useState('')
  const [technicalArea, setTechnicalArea] = useState('')
  const [appointment, setAppointment] = useState('')
  const [construction, setConstruction] = useState('')
  const [operationPrinciple, setOperationPrinciple] = useState('')
  const [technicalResult, setTechnicalResult] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { createPatent } = usePatents()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (name.trim() === '') {
      alert('Название патента обязательно')
      return
    }

    setLoading(true)

    try {
      const patentData = {
        name: name.trim(),
        ...(technicalArea.trim() && { technical_area: technicalArea.trim() }),
        ...(appointment.trim() && { appointment: appointment.trim() }),
        ...(construction.trim() && { construction: construction.trim() }),
        ...(operationPrinciple.trim() && { operation_principle: operationPrinciple.trim() }),
        ...(technicalResult.trim() && { technical_result: technicalResult.trim() }),
        ...(searchQuery.trim() && { search_query: searchQuery.trim() })
      }

      await createPatent(patentData)
      
      navigate('/workspace')
    } catch (error) {
      alert(`Ошибка создания патента: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/workspace')
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Новый патент</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="patent-name" className={styles.label}>Название</label>
          <input
            id="patent-name"
            type="text"
            placeholder="Введите название патента"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="technical-area" className={styles.label}>Техническая область</label>
          <input
            id="technical-area"
            type="text"
            placeholder="Опишите техническую область"
            value={technicalArea}
            onChange={(e) => setTechnicalArea(e.target.value)}
            disabled={loading}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="appointment" className={styles.label}>Назначение</label>
          <textarea
            id="appointment"
            placeholder="Опишите назначение патента"
            rows="3"
            value={appointment}
            onChange={(e) => setAppointment(e.target.value)}
            disabled={loading}
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="construction" className={styles.label}>Конструкция</label>
          <textarea
            id="construction"
            placeholder="Опишите конструкцию"
            rows="4"
            value={construction}
            onChange={(e) => setConstruction(e.target.value)}
            disabled={loading}
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="operation-principle" className={styles.label}>Принцип работы</label>
          <textarea
            id="operation-principle"
            placeholder="Опишите принцип работы"
            rows="4"
            value={operationPrinciple}
            onChange={(e) => setOperationPrinciple(e.target.value)}
            disabled={loading}
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="technical-result" className={styles.label}>Технический результат</label>
          <textarea
            id="technical-result"
            placeholder="Опишите технический результат"
            rows="3"
            value={technicalResult}
            onChange={(e) => setTechnicalResult(e.target.value)}
            disabled={loading}
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="search-query" className={styles.label}>Поисковый запрос</label>
          <input
            id="search-query"
            type="text"
            placeholder="Введите ключевые слова для поиска"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={handleCancel} 
            disabled={loading}
            className={styles.cancelButton}
          >
            Отмена
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Создание...' : 'Создать'}
          </button>
        </div>
      </form>
    </div>
  )
}