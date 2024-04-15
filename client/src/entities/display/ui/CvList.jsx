import { Link } from 'react-router-dom'
import { useGetAllQuery } from 'shared/api'
import styles from './display.module.css'

const CvList = ({ user }) => {
	const { data, isLoading, isFetching, isError, error } = useGetAllQuery(user)

	return (
		<div className={styles.container}>
			{(isFetching || isLoading) && <p className={styles.msg}>Loading...</p>}
			{isError && <p className={styles.error}>{error?.data?.message}</p>}
			<ul>
				{data?.cvs?.map(cv => (
					<li className={styles.linkItem} key={cv._id}>
						<Link className={styles.link} to={`/cv/${cv._id}/template`}>
							Edit {cv._id}
						</Link>
						<br />
						<Link className={styles.link} to={`/cv/${cv._id}/preview`}>
							Preview {cv._id}
						</Link>
						<hr />
					</li>
				))}
			</ul>
		</div>
	)
}

export default CvList
