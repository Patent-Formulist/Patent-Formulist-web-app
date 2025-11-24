import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import panelStyles from '../styles/HomeHoverPanel.module.css';

import pin from '../../../resources/pin.svg';
import activePin from '../../../resources/activePin.svg';
import magnifier from '../../../resources/magnifier.svg';
import paper from '../../../resources/paper.svg';

export default function HomeHoverPanel({ isPinned, onTogglePin }) {
  const [searchText, setSearchText] = useState('');
  const [activePatentId, setActivePatentId] = useState(null);

  const navigate = useNavigate();

  //TODO: достать из бд патенты
  const patents = [
    { id: 1, name: 'Патент 1' },
    { id: 2, name: 'Патент 2' }
  ];

  const onSearchChange = (e) => setSearchText(e.target.value);

  const onNewPatentClick = () => alert('Функционал создания нового патента пока не реализован');

  const onPatentClick = (id) => {
    setActivePatentId(id);
    navigate(`/workspace/patents/${id}`);
  };

  return (
    <div className={panelStyles.hoverPanelContent}>
      <header className={panelStyles.panelHeader}>
        <span className={panelStyles.panelTitle}>Главная</span>
        <button
          className={`${panelStyles.pinButton} ${isPinned ? panelStyles.pinned : ''}`}
          onClick={onTogglePin}
          aria-label="Закрепить панель"
          type="button"
        >
          <img src={isPinned ? activePin : pin} alt="Pin" />
        </button>
      </header>

      <hr className={panelStyles.divider} />

      <div className={panelStyles.searchBlock}>
        <img src={magnifier} alt="Поиск" className={panelStyles.icon} />
        <input
          type="text"
          placeholder="Поиск"
          value={searchText}
          onChange={onSearchChange}
          className={panelStyles.searchInput}
        />
      </div>

      <button className={panelStyles.newPatentButton} onClick={onNewPatentClick}>
        Новый патент
      </button>

      <div className={panelStyles.patentList}>
        {patents.map((patent) => {
          const isActive = patent.id === activePatentId;
          return (
            <button
              key={patent.id}
              className={`${panelStyles.patentItem} ${isActive ? panelStyles.patentItemActive : ''}`}
              onClick={() => onPatentClick(patent.id)}
              type="button"
            >
              <img src={paper} alt="Патент" className={panelStyles.icon} />
              <span className={panelStyles.patentName}>{patent.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}