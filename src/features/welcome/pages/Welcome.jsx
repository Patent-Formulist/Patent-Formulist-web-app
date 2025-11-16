import HeroComp from '../components/HeroComp'
import AboutComp from '../components/AboutComp'
import FAQComp from '../components/FAQComp'
import ContactsComp from '../components/ContactsComp'

import '../styles/Welcome.css'

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