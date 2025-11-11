import { useState } from 'react'
import { Link } from 'react-router-dom'
import arrow from '../../resources/arrow.svg'
import '../../styles/Welcome.css'

export default function Welcome() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Как работает проверка уникальности?',
      answer: 'Наша система анализирует патентные базы данных и выявляет аналоги вашей идеи, используя искусственный интеллект и алгоритмы сравнения.'
    },
    {
      question: 'Сколько времени занимает анализ?',
      answer: 'Обычно проверка занимает от n до k минут в зависимости от сложности идеи и количества аналогов в базе данных.'
    },
    {
      question: 'Какие документы нужны для проверки?',
      answer: 'Достаточно описания вашей идеи. Дополнительно можно приложить чертежи, схемы или прототипы для более точного анализа.'
    },
    {
      question: 'Как формируется патентная формула?',
      answer: 'На основе анализа аналогов и выявленных отличий наша система генерирует структурированную патентную формулу, соответствующую требованиям патентного законодательства.'
    },
    {
      question: 'Какие источники патентных данных используются?',
      answer: 'Мы используемы базу данных Роспатента.'
    }
  ]

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="welcome-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Patent Formulist</h1>
          <p className="hero-subtitle">
            Проверь уникальность своей идеи с помощью Patent Formulist уже сейчас!
          </p>
          <Link to="/try" className="hero-btn">
            Попробовать
          </Link>
        </div>
      </section>

      <section className="help-section">
        <h2 className="help-title">Мы поможем вам</h2>
        
        <div className="timeline">
          <div className="timeline-line"></div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <p className="timeline-text">Выявим аналоги</p>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <p className="timeline-text">Скажем отличия от аналогов</p>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <p className="timeline-text">Поможем понять уникальность</p>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <p className="timeline-text">Сформулируем патентную формулу</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-container">
          <h2 className="faq-title">Частые вопросы</h2>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${openIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <img 
                    src={arrow} 
                    alt="Toggle" 
                    className={`faq-arrow ${openIndex === index ? 'rotated' : ''}`}
                  />
                </button>
                
                <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
