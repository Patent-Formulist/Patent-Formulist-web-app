import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css"; 

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 — Страница не найдена</h1>
      <p>Увы, такой страницы не существует или она была удалена.</p>
      <div className="not-found-actions">
        <Link to="/" className="home-link">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NotFound