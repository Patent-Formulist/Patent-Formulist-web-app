import emailIcon from '../../../resources/mail.svg'
import vkIcon from '../../../resources/message.svg'
import telegramIcon from '../../../resources/plane.svg'
import simIcon from '../../../resources/sim.svg'

import styles from '../styles/WelcomeFooter.module.css'

function WelcomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.title}>Formulist</h3>
            <p className={styles.description}>
              Позволяем упростить жизнь изобретателям
            </p>
          </div>

          <div className={styles.contacts}>
            <h4 className={styles.heading}>Контакты</h4>
            <div className={styles.grid}>
              <a href="mailto:info@formulist.ru" className={styles.item}>
                <img src={emailIcon} alt="Email" className={styles.icon} />
                <span className={styles.text}>info@formulist.ru</span>
              </a>

              <a href="https://t.me/formulist" target="_blank" rel="noopener noreferrer" className={styles.item}>
                <img src={telegramIcon} alt="Telegram" className={styles.icon} />
                <span className={styles.text}>@formulist</span>
              </a>

              <a href="https://vk.com/formulist" target="_blank" rel="noopener noreferrer" className={styles.item}>
                <img src={vkIcon} alt="VK" className={styles.icon} />
                <span className={styles.text}>vk.com/formulist</span>
              </a>

              <a href="tel:+79991234567" className={styles.item}>
                <img src={simIcon} alt="Phone" className={styles.icon} />
                <span className={styles.text}>+7 (9XX) XXX-XX-XX</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default WelcomeFooter
