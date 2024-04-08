import { useParams } from 'react-router-dom'
import { useGetCVQuery } from 'shared/api'
import{AddWork} from 'features/forms'
import {WorkIntro }from 'entities/intro'
import styles from './cv.module.css'

export const Work = () => {

/* const [isExpanded, setIsExpanded] = useState(false)
const [activeIndex, setActiveIndex] = useState() */
	const { id } = useParams()

	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const { work } = data?.cv || []
	return (
		<div className={styles.wrapper}>
			<section className={styles.section}>
				<WorkIntro />
				{(isLoading || isFetching) && <p>Loading...</p>}
				{isError && <p className={styles.error}>{error.data?.message}</p>}
				<AddWork id={id} work={work} data={data} />
			</section>
		</div>
	)
}
