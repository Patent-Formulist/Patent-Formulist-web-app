import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import PatentButton from './PatentButton'

import patentService from '../../../services/patent/patentService'

import styles from '../styles/PatentsObservePanel.module.css'

import pin from '../../../resources/pin.svg'
import activePin from '../../../resources/activePin.svg'
import magnifier from '../../../resources/magnifier.svg'

export default function PatentsObservePanel({ isPinned, onTogglePin }) {
  const [searchText, setSearchText] = useState('')
  const [activePatentId, setActivePatentId] = useState(null)
  const [patents, setPatents] = useState([])

  const navigate = useNavigate()

  const loadPatents = async () => {
    try {
      const data = await patentService.getUserPatents()
      setPatents(data)
    } catch (e) {
      alert(`Ошибка загрузки патентов: ${e.message}`)
    }
  }

  useEffect(() => {
    loadPatents()
  }, [])

  const onSearchChange = (e) => setSearchText(e.target.value)

  const onPatentClick = (id) => {
    setActivePatentId(id)
    navigate(`/workspace/patents/${id}`)
  }

  return (
    <div className={styles.hoverPanelContent}>
      <header className={styles.panelHeader}>
        <span className={styles.panelTitle}>Главная</span>
        <button
          className={`${styles.pinButton} ${isPinned ? styles.pinned : ''}`}
          onClick={onTogglePin}
          aria-label="Закрепить панель"
          type="button"
        >
          <img src={isPinned ? activePin : pin} alt="Pin" />
        </button>
      </header>

      <hr className={styles.divider} />

      <div className={styles.searchBlock}>
        <img src={magnifier} alt="Поиск" className={styles.icon} />
        <input
          type="text"
          placeholder="Поиск"
          value={searchText}
          onChange={onSearchChange}
          className={styles.searchInput}
        />
      </div>

      <button 
        className={styles.newPatentButton} 
        onClick={() => navigate('/workspace/patent-creation')}
      >
        Новый патент
      </button>

      <div className={styles.patentList}>
        {patents
          .filter((p) => p.name && p.name.toLowerCase().includes(searchText.toLowerCase()))
          .map((patent) => (
            <PatentButton
              key={patent.id}
              patent={patent}
              isActive={patent.id === activePatentId}
              onClick={onPatentClick}
              onDeleted={loadPatents}
              onEdit={(id) => navigate(`/workspace/patents/${id}/edit`)}
            />
          ))}
      </div>
    </div>
  )
}