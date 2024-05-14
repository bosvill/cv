import { Link } from 'react-router-dom'
import {RegisterForm} from 'features/auth'
import styles from './auth.module.css'

export const Register = () => {
	return (
		<main className={styles.container}>
			<div>
				<RegisterForm />
				<div className={styles.linkItem}>
					Have an account?
					<Link to='/login' className={styles.link}>
						<span className={styles.link}>Login</span>
					</Link>
				</div>
			</div>
		</main>
	)
}

