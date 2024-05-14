import { AddHardskills } from 'features/forms'
import styles from './pages.module.css'

export const HardskillsPage = () => {
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<AddHardskills />
			</section>
		</div>
	)
}
