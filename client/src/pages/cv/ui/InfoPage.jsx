import { AddInfo } from 'features/forms'
import styles from './pages.module.css'

export const InfoPage = () => {
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<div className={styles.intro}>
					<h1 className={styles.title}>Personal details</h1>
					<p className={styles.details}>
						Get started with the basics: your name and contact information
					</p>
				</div>
				<AddInfo />
			</section>
		</div>
	)
}
