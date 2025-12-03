import { Outlet } from 'react-router-dom';

import WelcomeHeader from '../../features/welcome/components/WelcomeHeader';
import WelcomeFooter from '../../features/welcome/components/WelcomeFooter';

import styles from './WelcomeLayout.module.css';

function WelcomeLayout() {
  return (
    <div className={styles.layout}>
      <WelcomeHeader />

      <main className={styles.main}>
        <Outlet />
      </main>

      <WelcomeFooter />
    </div>
  );
}

export default WelcomeLayout;