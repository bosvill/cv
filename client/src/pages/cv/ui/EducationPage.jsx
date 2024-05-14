import { useParams } from 'react-router-dom'
import { AddEducation } from 'features/forms'
import styles from './pages.module.css'

export const EducationPage = () => {
	const { id } = useParams()

	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<div className={styles.intro}>
					<h1 className={styles.title}>Education</h1>
					<p className={styles.details}>
						A varied education sums up the value that your learnings and background will bring to
						job
					</p>
				</div>
				<AddEducation id={id} />
			</section>
		</div>
	)
}
