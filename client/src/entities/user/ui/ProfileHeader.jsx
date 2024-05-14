import { NavLink } from 'react-router-dom'
import styles from './user.module.css'

export const ProfileHeader = () => {
  
  const profileLinks = [
    { title: 'Account Settings', path: '/user/settings' },
    { title: 'Saved CVs', path: '/user/cvs' }
  ]
  return (
    <nav>
      <ul className={styles.links}>
        {profileLinks.map(el => (
          <li key={el.title}>
            <NavLink to={el.path}>{el.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
