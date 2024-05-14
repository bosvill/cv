import { Outlet } from "react-router-dom"
import styles from './layouts.module.css'
import { ProfileHeader } from "entities/user"


export const ProfileLayout = () => {
  return (
    <main className={styles.main}>
      <ProfileHeader/>
      <Outlet/>
    </main>
  )
}

