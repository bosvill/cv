import { useParams } from 'react-router-dom'
import { useGetCVQuery } from 'shared/api'
import { AddWork } from 'features/forms'
import { WorkIntro } from 'entities/intro'
import styles from './cv.module.css'

export const Work = () => {
	const { id } = useParams()

	return (
		<div className={styles.wrapper}>
			<section className={styles.section}>
				<WorkIntro />
				<AddWork id={id} />
			</section>
		</div>
	)
}
