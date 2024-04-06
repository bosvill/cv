import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import GuestSlot from './GuestSlot'
import styles from './Header.module.css'
import UserSlot from './UserSlot'

const Header = () => {
	const token = useSelector(state => state.auth.token)
	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<NavLink to='/' className={styles.logo}>
					TechCV
				</NavLink>
			</div>
			<div className={styles.headerRight}>{token ? <UserSlot /> : <GuestSlot />}</div>
		</header>
	)
}

export default Header
