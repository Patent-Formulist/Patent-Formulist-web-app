import { Outlet } from 'react-router-dom'

import WelcomeHeader from '../components/WelcomeHeader'
import WelcomeFooter from '../components/WelcomeFooter'

import styles from '../styles/WelcomeLayout.module.css'

function WelcomeLayout() {
  return (
    <div className={styles.layout}>
      <WelcomeHeader />

      <main className={styles.main}>
        <Outlet />
      </main>

      <WelcomeFooter />
    </div>
  )
}

export default WelcomeLayout