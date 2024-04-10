import { NavLink, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation} from 'src/shared/api'
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
			<NavLink to='/cv'> Start CV </NavLink>
			<NavLink to={`/user`}> Profile</NavLink>
			<IconButton onClick={onLogout}>
				<Icon className={styles.svg} id='exit' />
			</IconButton>
		</ul>
	)
}

export default UserSlot
