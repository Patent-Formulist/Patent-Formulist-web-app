import { Outlet } from 'react-router-dom'

import WelcomeHeader from '../components/WelcomeHeader'
import WelcomeFooter from '../components/WelcomeFooter'

import '../styles/WelcomeLayout.css'

function WelcomeLayout() {
  return (
    <div className="welcome-layout">
      <WelcomeHeader />

      <main className="welcome-main">
        <Outlet />
      </main>

      <WelcomeFooter />
    </div>
  )
}

export default WelcomeLayout