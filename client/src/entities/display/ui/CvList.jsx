import { Link } from 'react-router-dom'
import {  useGetAllQuery } from 'shared/api'
import styles from './display.module.css'

const CvList = ({id}) => {
	const { data, isLoading, isError, error } = useGetAllQuery(id)

	if (isLoading) <p>Loading...</p>
	if (isError) <p>{error?.data?.message}</p>

	return (
		<div className={styles.container}>
			<p className={styles.msg}>{data && data.message}</p>

			<ul>
				{data &&
					data.cvs.map(cv => (
						<li className={styles.linkItem} key={cv._id}>
							<Link className={styles.link} to={`/profile/${cv._id}`}>
								Edit {cv._id}
							</Link>
							<br />
							<Link className={styles.link} to={`/preview/${cv._id}`}>
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
