
import { Outlet, useNavigation } from 'react-router-dom'
import Header from 'widgets/Header'
import Footer from 'widgets/Footer'
import { Fallback } from 'shared/ui'


const Layout = () => {
	//const navigation= useNavigation()
	return (
		<>
		{/* {navigation.state==='loading' && <Fallback/>} */}
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layout
