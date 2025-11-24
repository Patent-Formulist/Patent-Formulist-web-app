import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import styles from '../styles/WorkspaceSidebar.module.css';
import HomeHoverPanel from './HomeHoverPanel';

import logo from '../../../resources/logo.svg';
import home from '../../../resources/home.svg';
import book from '../../../resources/book.svg';
import question from '../../../resources/question.svg';
import plus from '../../../resources/plus.svg';
import user from '../../../resources/user.svg';
import menu from '../../../resources/funcs.svg'; 

const navItems = [
  { id: 'home', to: '/workspace', icon: home, label: 'Главная' },
  { id: 'documentation', to: '/workspace/documentation', icon: book, label: 'Гайд' },
  { id: 'questions', to: '/workspace/questions', icon: question, label: 'Вопросы' },
];

export default function WorkspaceSidebar() {
  const [isHomePanelOpen, setIsHomePanelOpen] = useState(false);
  const [isPanelPinned, setIsPanelPinned] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [refreshFlag, setRefreshFlag] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnterNavItem = () => setIsHomePanelOpen(true);
  const handleMouseLeaveNavItem = () => { if (!isPanelPinned) setIsHomePanelOpen(false); };
  const handleMouseEnterPanel = () => setIsHomePanelOpen(true);
  const handleMouseLeavePanel = () => { if (!isPanelPinned) setIsHomePanelOpen(false); };
  const handleCreatePatent = () => navigate('/workspace/patent-creation');

  const togglePin = () => {
    if (isPanelPinned) setIsHomePanelOpen(false);
    setIsPanelPinned(p => !p);
  };

  const toggleSidebar = () => setIsSidebarOpen(open => !open);

  return (
    <>
      <button
        className={styles.mobileMenuButton}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Закрыть меню' : 'Открыть меню'}
        type="button"
      >
        <img src={menu} alt="Меню" />
      </button>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <header className={styles.header}>
          <Link to="/workspace" className={styles.logoLink} onClick={() => setIsSidebarOpen(false)}>
            <img src={logo} alt="Логотип" className={styles.logo} />
          </Link>
        </header>

        <div className={styles.actions}>
          <button 
            type="button" 
            className={styles.circleButton} 
            onClick={handleCreatePatent}
          >
            <img src={plus} alt="Новый" className={styles.actionIcon} />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <div
              key={item.id}
              className={styles.navItem}
              onMouseEnter={item.id === 'home' ? handleMouseEnterNavItem : undefined}
              onMouseLeave={item.id === 'home' ? handleMouseLeaveNavItem : undefined}
            >
              <NavLink
                to={item.to}
                end={item.id === 'home'}
                onClick={() => setIsSidebarOpen(false)} 
                className={({ isActive }) =>
                  `${styles.navButton} ${isActive ? styles.navButtonActive : ''}`
                }
              >
                <img src={item.icon} alt={item.label} className={styles.navIcon} />
              </NavLink>
              
              <span className={styles.navLabel}>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link to="/profile" className={styles.circleButton} onClick={() => setIsSidebarOpen(false)}>
            <img src={user} alt="Профиль" className={styles.actionIcon} />
          </Link>
        </div>
      </aside>

      <div
        className={`${styles.hoverPanel} ${(isHomePanelOpen || isPanelPinned) ? styles.active : ''}`}
        onMouseEnter={handleMouseEnterPanel}
        onMouseLeave={handleMouseLeavePanel}
      >
        <HomeHoverPanel
          isPinned={isPanelPinned}
          onTogglePin={togglePin}
          refreshFlag={refreshFlag}
        />
      </div>
    </>
  );
}