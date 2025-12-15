import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from '../styles/ProfileSidebar.module.css'

import arrow from '../../../resources/arrow.svg'
import user from '../../../resources/user.svg'
import settings from '../../../resources/settings.svg'
import message from '../../../resources/message.svg'
import menu from '../../../resources/funcs.svg'

const navItems = [
  {
    id: 'account',
    to: '/profile',
    icon: user,
    label: 'Профиль'
  },
  {
    id: 'settings',
    to: '/profile/settings',
    icon: settings,
    label: 'Настройки'
  },
  {
    id: 'feedback',
    to: '/profile/feedback',
    icon: message,
    label: 'Связаться'
  }
]

export default function ProfileSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const toggleSidebar = () => setIsSidebarOpen(open => !open)

  const handleBackToWorkspace = () => {
    navigate('/workspace')
    setIsSidebarOpen(false)
  }

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
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBackToWorkspace}
            aria-label="Вернуться в рабочее пространство"
          >
            <img src={arrow} alt="Назад" className={styles.backIcon} />
          </button>
        </header>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <div
              key={item.id}
              className={styles.navItem}
            >
              <NavLink
                to={item.to}
                end={item.id === 'account'}
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
      </aside>
    </>
  )
}