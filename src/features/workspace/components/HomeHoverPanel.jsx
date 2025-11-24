import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import patentService from '../../../services/patent/patentService';
import authService from '../../../services/auth/authService';

import styles from '../styles/HomeHoverPanel.module.css';

import pin from '../../../resources/pin.svg';
import activePin from '../../../resources/activePin.svg';
import magnifier from '../../../resources/magnifier.svg';
import paper from '../../../resources/paper.svg';

export default function HomeHoverPanel({ isPinned, onTogglePin, refreshFlag }) {
  const [searchText, setSearchText] = useState('');
  const [activePatentId, setActivePatentId] = useState(null);
  const [patents, setPatents] = useState([]);

  const userAccessToken = authService.getToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPatents() {
      try {
        const data = await patentService.getUserPatents(userAccessToken);
        setPatents(data);
      } catch (e) {
        alert(`Ошибка загрузки патентов: ${e.message}`);
      }
    }
    if (userAccessToken) {
      loadPatents();
    }
  }, [userAccessToken, refreshFlag]);

  const onSearchChange = (e) => setSearchText(e.target.value);

  const onNewPatentClick = () => alert('Функционал создания нового патента пока не реализован');

  const onPatentClick = (id) => {
    setActivePatentId(id);
    navigate(`/workspace/patents/${id}`);
  };

  const filteredPatents = patents.filter(
    p => p.name && p.name.toLowerCase().includes(searchText.toLowerCase())
  );

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

      <button className={styles.newPatentButton} onClick={onNewPatentClick}>
        Новый патент
      </button>

      <div className={styles.patentList}>
        {filteredPatents.map((patent) => {
          const isActive = patent.id === activePatentId;
          return (
            <button
              key={patent.id}
              className={`${styles.patentItem} ${isActive ? styles.patentItemActive : ''}`}
              onClick={() => onPatentClick(patent.id)}
              type="button"
            >
              <img src={paper} alt="Патент" className={styles.icon} />
              <span className={styles.patentName}>{patent.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}