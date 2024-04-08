import { NavLink } from 'react-router-dom'
import {Icon} from 'src/shared/ui'
import styles from './Header.module.css'

const GuestSlot = () => {
	return (
		<ul className={styles.nav}>
			<NavLink to='/login' className={styles.loginLink}>
				Login
				<Icon id='enter' className={styles.svg} />
			</NavLink>
			<NavLink to='/register' className={styles.loginLink}>
				Sign Up
			</NavLink>
		</ul>
	)
}

export default GuestSlot
