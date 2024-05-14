import { useParams } from 'react-router-dom'
import { AddProfile } from 'features/forms'
import styles from './pages.module.css'

export const ProfilePage = () => {
	const { id } = useParams()
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<div className={styles.intro}>
					<h1 className={styles.title}>Professional Summary</h1>
					<p className={styles.details}>
						Add a wanted job title and a summary of relevant professional abilities,
						accomplishments, and personal qualities that make you the right candidate for the job.
					</p>
				</div>
				<AddProfile id={id} />
			</section>
		</div>
	)
}
