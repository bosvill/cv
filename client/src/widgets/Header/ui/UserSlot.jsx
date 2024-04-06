import { NavLink, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useSendLogoutMutation,selectUser } from 'src/shared/api'
import { IconButton, Icon } from 'src/shared/ui'
import styles from './Header.module.css'

const UserSlot = () => {
	const id=useSelector(selectUser)
	const navigate = useNavigate()
	const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation()
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
