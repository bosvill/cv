import { NavLink, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from 'src/shared/api'
import { IconButton, Icon } from 'src/shared/ui'
import styles from './Header.module.css'

const UserSlot = () => {
	const navigate = useNavigate()
	const [sendLogout] = useSendLogoutMutation()
	const onLogout = () => {
		sendLogout()
		navigate('/')
	}

	return (
		<ul className={styles.nav}>
			<li>
				<NavLink to='/create' end className={styles.link}>
					Start CV
				</NavLink>
			</li>
      <li>
				<NavLink to='/cover' end className={styles.link}>
					Cover Letter
				</NavLink>
			</li>
			<li>
				<NavLink to={`/user/cvs`} className={styles.link}>
					Profile
				</NavLink>
			</li>
			<li>
				<IconButton onClick={onLogout} title='Logout'>
					<Icon className={styles.svg} id='exit' />
				</IconButton>
			</li>
		</ul>
	)
}

export default UserSlot
