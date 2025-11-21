import { Outlet } from 'react-router-dom'

import WorkspaceNavigation from '../components/WorkspaceNavigation'

import styles from '../styles/WorkspaceLayout.module.css'

function WorkspaceLayout() {
    return (
        <div className={styles.layout}>
            <WorkspaceNavigation/>
            
            <main className={styles.main}>
                <Outlet />
            </main>
        </div> 
    )
}

export default WorkspaceLayout