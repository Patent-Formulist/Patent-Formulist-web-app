import { Link } from 'react-router-dom';

import styles from "../styles/NotFound.module.css"; 

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404 — Страница не найдена</h1>
      <p>Увы, такой страницы не существует или она была удалена.</p>
      <div className={styles.actions}>
        <Link to="/" className={styles.link}>
          Вернуться на главную
        </Link>
        
      </div>
    </div>
  );
}

export default NotFound;