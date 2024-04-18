import { useParams } from 'react-router-dom'
import { AddWork } from 'features/forms'
import styles from './pages.module.css'

export const WorkPage = () => {
	const { id } = useParams()

	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<div className={styles.intro}>
					<h1 className={styles.title}>Proffesional Experience</h1>
					<p className={styles.details}>Show your relevant work experience and main achievements</p>
				</div>
				<AddWork id={id} />
			</section>
		</div>
	)
}
