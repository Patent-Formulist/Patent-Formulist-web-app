import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../../resources/logo.svg'
import funcsIcon from '../../../resources/funcs.svg'

import styles from '../styles/WelcomeHeader.module.css'

function WelcomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink} onClick={closeMenu}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <Link to="/about" onClick={closeMenu}>О нас</Link>
          <Link to="/faq" onClick={closeMenu}>Частые вопросы</Link>
          <Link to="/contacts" onClick={closeMenu}>Контакты</Link>
          
          <div className={styles.mobileAuthButtons}>
            <Link to="/register" className={styles.mobileRegisterBtn} onClick={closeMenu}>
              Регистрация
            </Link>
            <Link to="/login" className={styles.mobileLoginBtn} onClick={closeMenu}>
              Войти
            </Link>
          </div>
        </nav>

        <div className={styles.authButtons}>
          <Link to="/signin" className={styles.registerBtn} onClick={closeMenu}>
            Регистрация
          </Link>
          <Link to="/login" className={styles.loginBtn} onClick={closeMenu}>
            Войти
          </Link>
        </div>

        <button 
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img src={funcsIcon} alt="Menu" className={styles.menuIcon} />
        </button>
      </div>
    </header>
  )
}

export default WelcomeHeader