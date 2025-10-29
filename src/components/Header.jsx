import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../resources/logo.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <nav className={`header-center ${menuOpen ? 'open' : ''}`} aria-label="Главное меню">
        <Link to="/about" onClick={closeMenu}>О нас</Link>
        <Link to="/faq" onClick={closeMenu}>FAQ</Link>
        <Link to="/contacts" onClick={closeMenu}>Контакты</Link>
        <Link to="/login" className="login-btn mobile-login" onClick={closeMenu}>Войти</Link>
      </nav>

      <div className="header-right">
        <Link to="/login" className="login-btn desktop-login">Войти</Link>
        <button className="burger-menu" aria-label="Меню" onClick={toggleMenu}>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
