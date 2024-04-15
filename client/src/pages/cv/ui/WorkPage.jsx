import { useParams } from 'react-router-dom'
import { AddWork } from 'features/forms'
import { WorkIntro } from 'entities/intro'
import styles from './pages.module.css'

export const WorkPage = () => {
	const { id } = useParams()

	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<WorkIntro />
				<AddWork id={id} />
			</section>
		</div>
	)
}
