import "../../styles/welcome_styles/AboutComp.css"

function AboutComp() {
  return (
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
  )
}

export default AboutComp