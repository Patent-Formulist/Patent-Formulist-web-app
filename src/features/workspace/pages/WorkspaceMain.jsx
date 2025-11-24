import { Link } from "react-router-dom";

import styles from "../styles/WorkspaceMain.module.css";

function WorkspaceMain() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Formulist</h1>

        <p className={styles.subtitle}>
          Проверь уникальность своей идеи с помощью Formulist уже сейчас!
        </p>
        
        <Link to="/signin" className={styles.btn}>
          Создать патент
        </Link>
      </div>
    </section>
  )
}

export default WorkspaceMain;