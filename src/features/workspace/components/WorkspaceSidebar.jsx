import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import sidebarStyles from '../styles/WorkspaceSidebar.module.css';
import HomeHoverPanel from './HomeHoverPanel';

import logo from '../../../resources/logo.svg';
import home from '../../../resources/home.svg';
import book from '../../../resources/book.svg';
import question from '../../../resources/question.svg';
import plus from '../../../resources/plus.svg';
import user from '../../../resources/user.svg';

const navItems = [
  { id: 'home', to: '/workspace', icon: home, label: 'Главная' },
  { id: 'documentation', to: '/workspace/documentation', icon: book, label: 'Гайд' },
  { id: 'questions', to: '/workspace/questions', icon: question, label: 'Вопросы' },
];

export default function WorkspaceSidebar() {
  const [isHomePanelOpen, setIsHomePanelOpen] = useState(false);
  const [isPanelPinned, setIsPanelPinned] = useState(false);

  const handleMouseEnterNavItem = () => setIsHomePanelOpen(true);
  const handleMouseLeaveNavItem = () => { if (!isPanelPinned) setIsHomePanelOpen(false); };
  const handleMouseEnterPanel = () => setIsHomePanelOpen(true);
  const handleMouseLeavePanel = () => { if (!isPanelPinned) setIsHomePanelOpen(false); };

  const togglePin = () => {
    if (isPanelPinned) setIsHomePanelOpen(false);
    setIsPanelPinned(p => !p);
  }

  return (
    <>
      <aside className={sidebarStyles.sidebar}>
        <header className={sidebarStyles.header}>
          <Link to="/workspace" className={sidebarStyles.logoLink}>
            <img src={logo} alt="Логотип" className={sidebarStyles.logo} />
          </Link>
        </header>

        <div className={sidebarStyles.actions}>
          <button type="button" className={sidebarStyles.circleButton} onClick={() => {}}>
            <img src={plus} alt="Новый" className={sidebarStyles.actionIcon} />
          </button>
        </div>

        <nav className={sidebarStyles.nav}>
          {navItems.map(item => (
            <div
              key={item.id}
              className={sidebarStyles.navItem}
              onMouseEnter={item.id === 'home' ? handleMouseEnterNavItem : undefined}
              onMouseLeave={item.id === 'home' ? handleMouseLeaveNavItem : undefined}
            >
              <NavLink
                to={item.to}
                end={item.id === 'home'}
                className={({ isActive }) =>
                  `${sidebarStyles.navButton} ${isActive ? sidebarStyles.navButtonActive : ''}`
                }
              >
                <img src={item.icon} alt={item.label} className={sidebarStyles.navIcon} />
              </NavLink>
              <span className={sidebarStyles.navLabel}>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className={sidebarStyles.actions}>
          <Link to="/profile" className={sidebarStyles.circleButton}>
            <img src={user} alt="Профиль" className={sidebarStyles.actionIcon} />
          </Link>
        </div>
      </aside>

      <div
        className={`${sidebarStyles.hoverPanel} ${(isHomePanelOpen || isPanelPinned) ? sidebarStyles.active : ''}`}
        onMouseEnter={handleMouseEnterPanel}
        onMouseLeave={handleMouseLeavePanel}
      >
        <HomeHoverPanel isPinned={isPanelPinned} onTogglePin={togglePin} />
      </div>
    </>
  );
}