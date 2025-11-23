import emailIcon from '../../../resources/mail.svg';
import vkIcon from '../../../resources/message.svg';
import telegramIcon from '../../../resources/plane.svg';
import phoneIcon from '../../../resources/phone.svg';

import styles from "../styles/ContactsComp.module.css";

function ContactsComp() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Как с нами связаться</h2>
        
        <div className={styles.grid}>
          <a href="mailto:info@formulist.ru" className={styles.item}>
            <img src={emailIcon} alt="Емэил" className={styles.icon} />
            <span className={styles.text}>info@formulist.ru</span>
          </a>

          <a href="https://t.me/formulist" target="_blank" rel="noopener noreferrer" className={styles.item}>
            <img src={telegramIcon} alt="Телеграмм" className={styles.icon} />
            <span className={styles.text}>@formulist</span>
          </a>

          <a href="https://vk.com/formulist" target="_blank" rel="noopener noreferrer" className={styles.item}>
            <img src={vkIcon} alt="ВКонтакте" className={styles.icon} />
            <span className={styles.text}>vk.com/formulist</span>
          </a>

          <a href="tel:+79991234567" className={styles.item}>
            <img src={phoneIcon} alt="Телефон" className={styles.icon} />
            <span className={styles.text}>+7 (9XX) XXX-XX-XX</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactsComp;