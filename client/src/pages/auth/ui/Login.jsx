import { Link } from 'react-router-dom'
import {LoginForm} from 'features/auth'
import styles from './auth.module.css'

export const Login = () => {
	return (
		<main className={styles.wrapper}>
			<div>
				<LoginForm />
				<div className={styles.linkItem}>
					No account?
					<Link to='/register' className={styles.link}>
						Create one
					</Link>
				</div>
			</div>
		</main>
	)
}


