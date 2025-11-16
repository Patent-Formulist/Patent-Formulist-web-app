import { useState } from 'react'

import arrow from '../../resources/arrow.svg'

import "../../styles/welcome_styles/FAQComp.css"

function FAQComp() {

  const [openIndexes, setOpenIndexes] = useState([])

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
    setOpenIndexes(prevIndexes => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter(i => i !== index)
      } else {
        return [...prevIndexes, index]
      }
    })
  }
  
  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Частые вопросы</h2>
        
        <div className="faq-list">
          {
            faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${openIndexes.includes(index) ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>

                  <img 
                    src={arrow} 
                    alt="Toggle" 
                    className={`faq-arrow ${openIndexes.includes(index) ? 'rotated' : ''}`}
                  />
                </button>
                
                <div className={`faq-answer ${openIndexes.includes(index) ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQComp