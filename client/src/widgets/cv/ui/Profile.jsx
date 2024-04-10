import { useParams } from 'react-router-dom'
import { useGetCVQuery } from 'shared/api'
import {ProfileIntro} from 'entities/intro'
import {AddProfile }from 'features/forms'
import styles from './cv.module.css'

export const Profile = () => {
	const { id } = useParams()

	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const { position, profile } = data?.cv || {}

	return (
		<div className={styles.wrapper}>
			<section className={styles.section}>
				<ProfileIntro />
				{(isLoading || isFetching) && <p>Loading...</p>}
				{isError && <p className={styles.error}>{error.data?.message}</p>}
				<AddProfile id={id} position={position} profile={profile} data={data} />
			</section>
		</div>
	)
}
