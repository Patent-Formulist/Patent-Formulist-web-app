import styles from "../styles/AboutComp.module.css";

function AboutComp() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Мы поможем вам</h2>

      <div className={styles.timeline}>
        <div className={styles.line}></div>
        
        <div className={styles.item}>
          <div className={styles.dot}></div>
          <p className={styles.text}>Выявим аналоги</p>
        </div>
        
        <div className={styles.item}>
          <div className={styles.dot}></div>
          <p className={styles.text}>Скажем отличия от аналогов</p>
        </div>
        
        <div className={styles.item}>
          <div className={styles.dot}></div>
          <p className={styles.text}>Поможем понять уникальность</p>
        </div>
        
        <div className={styles.item}>
          <div className={styles.dot}></div>
          <p className={styles.text}>Сформулируем патентную формулу</p>
        </div>
      </div>
    </section>
  );
}

export default AboutComp;