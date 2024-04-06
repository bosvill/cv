import { useParams } from 'react-router-dom'
import { useGetCVQuery } from 'shared/api'
import {AddEducation} from 'features/forms'
import {EducationIntro} from 'entities/intro'
import styles from './cv.module.css'

export const Education = () => {
	const { id } = useParams()

	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const { education } = data?.cv || {}

	return (
		<div className={styles.wrapper}>
			<section className={styles.section}>
				<EducationIntro />
				{(isLoading || isFetching) && <p>Loading...</p>}
				{isError && <p className={styles.error}>{error.data?.message}</p>}
				<AddEducation id={id} education={education} data={data} />
			</section>
		</div>
	)
}
