
import { CvList } from 'entities/user'
import { useSelector } from 'react-redux'
import { selectEmail, useGetProfileQuery } from 'shared/api'
import { selectUser } from 'shared/api'
import styles from './user.module.css'


export const UserHome = () => {
	const user = useSelector(selectUser)
  const email=useSelector(selectEmail)
	//const { data, isLoading } = useGetProfileQuery(user)

	//if (isLoading) return <p>Loading profile...</p>

	return (
		<div className={styles.container}>
			<h1>Welcome {email}!</h1>
			<CvList user={user}/>
		</div>
	)

}

