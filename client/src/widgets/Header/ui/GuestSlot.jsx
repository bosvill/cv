import { NavLink } from 'react-router-dom'
import {Icon} from 'src/shared/ui'
import styles from './Header.module.css'

const GuestSlot = () => {
	return (
		<ul className={styles.nav}>
			<NavLink to='/login' className={styles.loginBtn}>
				Login
				<Icon id='enter' className={styles.svg} />
			</NavLink>
			<NavLink to='/register' className={styles.loginBtn}>
				Sign Up
			</NavLink>
		</ul>
	)
}

export default GuestSlot
