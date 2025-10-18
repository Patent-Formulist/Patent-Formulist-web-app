import '../styles/Header.css';
import logo from '../resources/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="nav-bar">
        <Link to="/" aria-label="Главная" className="logo-link">
          <img src={logo} alt="Логотип" className="logo" />
        </Link>
        <div 
          className={`nav-text-links ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(false)} 
        >
          <Link to="/about" className="nav-link">О нас</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
          <Link to="/contacts" className="nav-link">Контакты</Link>
        </div>
        <div className="login-link">
          <Link to="/login" className="nav-link">Войти</Link>
        </div>
        <div 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter') setMenuOpen(!menuOpen); }}
        >
          &#9776;
        </div>
      </nav>
    </header>
  );
}

export default Header;
