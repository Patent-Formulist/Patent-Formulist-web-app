import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authService from '../../../services/auth/authService';

import styles from "../styles/HeroComp.module.css";


function HeroComp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await authService.validate();
        setIsAuthenticated(isValid);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return(
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Formulist</h1>

        <p className={styles.subtitle}>
          Проверь уникальность своей идеи с помощью Formulist уже сейчас!
        </p>
        
        {isAuthenticated ? (
          <Link to="/workspace" className={styles.btn}>
            К работе
          </Link>
        ) : (
          <Link to="/signin" className={styles.btn}>
            Попробовать
          </Link>
        )}
      </div>
    </section>
  );
}


export default HeroComp;