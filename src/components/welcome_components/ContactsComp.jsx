import emailIcon from '../../resources/mail.svg'
import vkIcon from '../../resources/message.svg'
import telegramIcon from '../../resources/plane.svg'
import simIcon from '../../resources/sim.svg'

import "../../styles/welcome_styles/ContactsComp.css"

function ContactsComp() {
  return (
    <section className="contacts-section">
      <div className="contacts-container">
        <h2 className="contacts-title">Как с нами связаться</h2>
        
        <div className="contacts-grid">
          <a href="mailto:info@formulist.ru" className="contact-item">
            <img src={emailIcon} alt="Email" className="contact-icon" />
            <span className="contact-text">info@formulist.ru</span>
          </a>

          <a href="https://t.me/formulist" target="_blank" rel="noopener noreferrer" className="contact-item">
            <img src={telegramIcon} alt="Telegram" className="contact-icon" />
            <span className="contact-text">@formulist</span>
          </a>

          <a href="https://vk.com/formulist" target="_blank" rel="noopener noreferrer" className="contact-item">
            <img src={vkIcon} alt="VK" className="contact-icon" />
            <span className="contact-text">vk.com/formulist</span>
          </a>

          <a href="tel:+79991234567" className="contact-item">
            <img src={simIcon} alt="Phone" className="contact-icon" />
            <span className="contact-text">+7 (9XX) XXX-XX-XX</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactsComp