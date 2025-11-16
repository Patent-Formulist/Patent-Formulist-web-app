import { Link } from 'react-router-dom'

import "../../styles/welcome_styles/HeroComp.css"

function HeroComp() {
    return(
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Formulist</h1>

                <p className="hero-subtitle">
                    Проверь уникальность своей идеи с помощью Formulist уже сейчас!
                </p>
                
                <Link to="/signin" className="hero-btn">
                    Попробовать
                </Link>
            </div>
      </section>
    )
}

export default HeroComp