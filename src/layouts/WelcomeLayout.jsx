import { Outlet } from 'react-router-dom'

import WelcomeHeader from '../components/welcome_components/WelcomeHeader'
import WelcomeFooter from '../components/welcome_components/WelcomeFooter'

import '../styles/WelcomeLayout.css'

export default function Layout() {
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