import { AddSoftskills } from 'features/forms'
import styles from './pages.module.css'

export const SoftskillsPage = () => {
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<AddSoftskills />
			</section>
		</div>
	)
}
