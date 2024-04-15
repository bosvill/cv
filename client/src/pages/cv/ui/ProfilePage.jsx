import { useParams } from 'react-router-dom'
import { ProfileIntro } from 'entities/intro'
import { AddProfile } from 'features/forms'
import styles from './pages.module.css'

export const ProfilePage = () => {
	const { id } = useParams()
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<ProfileIntro />
				<AddProfile id={id} />
			</section>
		</div>
	)
}
