import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectUser } from 'shared/api/auth/authSlice'

const PrivateOutlet = () => {
	const user = useSelector(selectUser)
	const location = useLocation()
	return user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />
}

export default PrivateOutlet
