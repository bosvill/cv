import { NavLink } from 'react-router-dom'
import {Icon} from 'src/shared/ui'
import styles from './Header.module.css'

const GuestSlot = () => {
	return (
		<ul className={styles.nav}>
			<li>
				<NavLink to='/login' className={styles.link}>
					<span>Login</span>
					<Icon id='enter' className={styles.svg} />
				</NavLink>
			</li>
			<li>
				<NavLink to='/register' className={styles.link}>
					Sign Up
				</NavLink>
			</li>
		</ul>
	)
}

export default GuestSlot
