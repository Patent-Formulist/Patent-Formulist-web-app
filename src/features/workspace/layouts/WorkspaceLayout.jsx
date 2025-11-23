import { Outlet } from 'react-router-dom';

import WorkspaceSidebar from '../components/WorkspaceSidebar';

import styles from '../styles/WorkspaceLayout.module.css';

function WorkspaceLayout() {
  return (
    <>
      <WorkspaceSidebar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default WorkspaceLayout;