import HeroComp from '../../components/welcome_components/HeroComp'
import AboutComp from '../../components/welcome_components/AboutComp'
import FAQComp from '../../components/welcome_components/FAQComp'
import ContactsComp from '../../components/welcome_components/ContactsComp'

import '../../styles/welcome_styles/Welcome.css'

function Welcome() {

  return (
    <div className="welcome-page">
      <HeroComp />

      <AboutComp />

      <ContactsComp />

      <FAQComp />
    </div>
  )
}

export default Welcome