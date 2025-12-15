import { Outlet } from 'react-router-dom'
import ProfileSidebar from './components/ProfileSidebar'
import styles from './styles/ProfileLayout.module.css'

function ProfileLayout() {
  return (
    <>
      <ProfileSidebar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}

export default ProfileLayout