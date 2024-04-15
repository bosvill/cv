import { AddLanguages } from 'features/forms'
import styles from './pages.module.css'

export const LanguagesPage = () => {
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<AddLanguages />
			</section>
		</div>
	)
}
