import CvList from 'entities/display/ui/CvList'
import { useSelector } from 'react-redux'
import { useGetProfileQuery } from 'shared/api'
import { selectUser } from 'shared/api'


const UserProfile = () => {
	const id = useSelector(selectUser)
	const { data, isLoading } = useGetProfileQuery(id)
	console.log(data)

	if (isLoading) return <p>Loading profile...</p>

	return (
		<div>
			<h2>Welcome {data && data?.userInfo.email}!</h2>
			<CvList id={id}/>
		</div>
	)

}

export default UserProfile
