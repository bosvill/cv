import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'widgets/Header'
import Footer from 'widgets/Footer'

const AppLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default AppLayout
