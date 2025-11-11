import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../resources/logo.svg'
import funcsIcon from '../../resources/funcs.svg'
import '../../styles/WelcomeHeader.css'

function WelcomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="welcome-header">
      <div className="header-container">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/about" onClick={closeMenu}>О нас</Link>
          <Link to="/faq" onClick={closeMenu}>Частые вопросы</Link>
          <Link to="/contacts" onClick={closeMenu}>Контакты</Link>
        </nav>

        <Link to="/login" className="login-btn" onClick={closeMenu}>
          Войти
        </Link>

        <button 
          className={`hamburger ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img src={funcsIcon} alt="Menu" className="menu-icon" />
        </button>
      </div>
    </header>
  )
}

export default WelcomeHeader
