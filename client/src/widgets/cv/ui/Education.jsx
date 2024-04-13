import { useParams } from 'react-router-dom'
import {AddEducation} from 'features/forms'
import {EducationIntro} from 'entities/intro'
import styles from './cv.module.css'

export const Education = () => {
	const { id } = useParams()

	return (
		<div className={styles.wrapper}>
			<section className={styles.section}>
				<EducationIntro />
				<AddEducation id={id}  />
			</section>
		</div>
	)
}
