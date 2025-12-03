import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePatents } from '../../../contexts/PatentsContext'

import PatentButton from './PatentButton'

import styles from '../styles/PatentsPanel.module.css'

import pin from '../../../resources/pin.svg'
import activePin from '../../../resources/activePin.svg'
import magnifier from '../../../resources/magnifier.svg'

export default function PatentsObservePanel({ isPinned, onTogglePin, isPanelVisible }) {
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const { patents, loadPatents } = usePatents()

  useEffect(() => {
    loadPatents()
  }, [loadPatents])

  const onSearchChange = (e) => setSearchText(e.target.value)

  const filteredPatents = patents.filter((patent) => {
    if (!searchText.trim()) return true 

    const query = searchText.toLowerCase()
    const name = patent.name?.toLowerCase() || ''
    const searchQuery = patent.search_query?.toLowerCase() || ''

    return name.includes(query) || searchQuery.includes(query)
  })

  const activePatentId = location.pathname.match(/\/patents\/([^\/]+)/)?.[1]

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
          placeholder="Поиск по названию или ключевым словам"
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
        {filteredPatents.length > 0 ? (
          filteredPatents.map((patent) => (
            <PatentButton
              key={patent.id}
              patent={patent}
              isActive={patent.id === activePatentId}
              isPanelVisible={isPanelVisible}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            Патенты не найдены
          </div>
        )}
      </div>
    </div>
  )
}