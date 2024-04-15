import { useParams } from 'react-router-dom'
import { AddEducation } from 'features/forms'
import { EducationIntro } from 'entities/intro'
import styles from './pages.module.css'

export const EducationPage = () => {
	const { id } = useParams()

	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<EducationIntro />
				<AddEducation id={id} />
			</section>
		</div>
	)
}
