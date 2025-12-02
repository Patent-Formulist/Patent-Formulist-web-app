import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePatents } from '../../../contexts/PatentsContext'

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

      const response = await createPatent(patentData)
      
      navigate('/workspace')
    } catch (error) {
      alert(`Ошибка создания патента: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Новый патент</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="patent-name">Название</label>
        <input
          id="patent-name"
          type="text"
          placeholder="Введите название патента"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="technical-area">Техническая область</label>
        <input
          id="technical-area"
          type="text"
          placeholder="Введите техническую область"
          value={technicalArea}
          onChange={(e) => setTechnicalArea(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="appointment">Назначение</label>
        <textarea
          id="appointment"
          placeholder="Опишите назначение патента"
          rows="3"
          value={appointment}
          onChange={(e) => setAppointment(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="construction">Конструкция</label>
        <textarea
          id="construction"
          placeholder="Опишите конструкцию"
          rows="4"
          value={construction}
          onChange={(e) => setConstruction(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="operation-principle">Принцип работы</label>
        <textarea
          id="operation-principle"
          placeholder="Опишите принцип работы"
          rows="4"
          value={operationPrinciple}
          onChange={(e) => setOperationPrinciple(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="technical-result">Технический результат</label>
        <textarea
          id="technical-result"
          placeholder="Опишите технический результат"
          rows="3"
          value={technicalResult}
          onChange={(e) => setTechnicalResult(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="search-query">Поисковый запрос</label>
        <input
          id="search-query"
          type="text"
          placeholder="Введите ключевые слова для поиска"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Создание...' : 'Создать патент'}
        </button>
      </form>
    </div>
  )
}