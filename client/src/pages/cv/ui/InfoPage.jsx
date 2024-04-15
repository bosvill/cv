import { AddInfo } from 'features/forms'
import styles from './pages.module.css'

export const InfoPage = () => {
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<AddInfo />
			</section>
		</div>
	)
}
