import CvList from 'entities/display/ui/CvList'
import { useSelector } from 'react-redux'
import { useGetProfileQuery } from 'shared/api'
import { selectUser } from 'shared/api'


export const UserProfile = () => {
	const user = useSelector(selectUser)
	const { data, isLoading } = useGetProfileQuery(user)
	console.log(data)

	if (isLoading) return <p>Loading profile...</p>

	return (
		<div>
			<h2>Welcome {data && data?.userInfo.email}!</h2>
			<CvList user={user}/>
		</div>
	)

}

