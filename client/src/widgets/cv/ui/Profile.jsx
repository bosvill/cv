import { useParams } from 'react-router-dom'
import { useGetCVQuery } from 'shared/api'
import { ProfileIntro } from 'entities/intro'
import { AddProfile } from 'features/forms'
import styles from './cv.module.css'

export const Profile = () => {
	const { id } = useParams()

	

	return (
		<div className={styles.wrapper}>
			<section className={styles.section}>
				<ProfileIntro />
				<AddProfile id={id} />
			</section>
		</div>
	)
}
