import { useParams } from 'react-router-dom'
import { useGetCVQuery } from 'shared/api'
import { ProfileIntro } from 'entities/intro'
import { AddProfile } from 'features/forms'
import styles from './cv.module.css'
import { AddImage } from 'features/forms/ui/AddImage'

export const Profile = () => {
	const { id } = useParams()

	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const { position, profile, image } = data?.cv || {}

	return (
		<div className={styles.wrapper}>
			<section className={styles.section}>
				<ProfileIntro />
				{isError && <p className={styles.error}>{error.data?.message}</p>}
				{isLoading || (isFetching && <p>Loading...</p>)}
				<AddProfile id={id} position={position} profile={profile} image={image} />
				{/* {isLoading || isFetching ? (
					<p>Loading...</p>
				) : (
					<div className={styles.formContainer}>
						<AddImage id={id} image={image} />
						<AddProfile id={id} position={position} profile={profile} data={data} />
					</div>
				)} */}
			</section>
		</div>
	)
}
