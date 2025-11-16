import emailIcon from '../../../resources/mail.svg'
import vkIcon from '../../../resources/message.svg'
import telegramIcon from '../../../resources/plane.svg'
import simIcon from '../../../resources/sim.svg'

import '../styles/WelcomeFooter.css'

function WelcomeFooter() {
  return (
    <footer className="welcome-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-title">Formulist</h3>
            <p className="footer-description">
              Позволяем упростить жизнь изобретателям
            </p>
          </div>

          <div className="footer-contacts">
            <h4 className="footer-contacts-heading">Контакты</h4>
            <div className="footer-contacts-grid">
              <a href="mailto:info@formulist.ru" className="footer-contact-item">
                <img src={emailIcon} alt="Email" className="footer-contact-icon" />
                <span className="footer-contact-text">info@formulist.ru</span>
              </a>

              <a href="https://t.me/formulist" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <img src={telegramIcon} alt="Telegram" className="footer-contact-icon" />
                <span className="footer-contact-text">@formulist</span>
              </a>

              <a href="https://vk.com/formulist" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <img src={vkIcon} alt="VK" className="footer-contact-icon" />
                <span className="footer-contact-text">vk.com/formulist</span>
              </a>

              <a href="tel:+79991234567" className="footer-contact-item">
                <img src={simIcon} alt="Phone" className="footer-contact-icon" />
                <span className="footer-contact-text">+7 (9XX) XXX-XX-XX</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default WelcomeFooter
