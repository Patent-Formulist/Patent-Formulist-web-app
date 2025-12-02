import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePatents } from '../../../contexts/PatentsContext'

import PatentButton from './PatentButton'

import styles from '../styles/PatentsObservePanel.module.css'

import pin from '../../../resources/pin.svg'
import activePin from '../../../resources/activePin.svg'
import magnifier from '../../../resources/magnifier.svg'

export default function PatentsObservePanel({ isPinned, onTogglePin }) {
  const [searchText, setSearchText] = useState('')
  const [activePatentId, setActivePatentId] = useState(null)

  const navigate = useNavigate()
  const { patents, loadPatents, deletePatent } = usePatents()

  useEffect(() => {
    loadPatents()
  }, [loadPatents])

  const onSearchChange = (e) => setSearchText(e.target.value)

  const onPatentClick = (id) => {
    setActivePatentId(id)
    navigate(`/workspace/patents/${id}`)
  }

  const handleDeletePatent = async (id) => {
    try {
      await deletePatent(id)
    } catch (e) {
      alert(`Ошибка удаления патента: ${e.message}`)
    }
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
              onDeleted={() => handleDeletePatent(patent.id)}
              onEdit={(id) => navigate(`/workspace/patents/${id}/edit`)}
            />
          ))}
      </div>
    </div>
  )
}