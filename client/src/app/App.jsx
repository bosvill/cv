import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Outlet
} from 'react-router-dom'
import './index.css'
import { ErrorBoundary,Fallback } from 'shared/ui'
import Layout from './Layout'
import PrivateOutlet from './PrivateOutlet'
import UserProfile from 'pages/user'
import { Login } from 'pages/auth'
import { Register } from 'pages/auth'
import Preview from 'pages/cv/Preview'
import Home from 'pages/public'

import { Education } from 'widgets/cv'
import { Profile } from 'widgets/cv'
import { Work } from 'widgets/cv'
import { PreviewReact } from 'widgets/previewReact'

import { CreateCV } from 'features/forms'

import { AddHardskills, AddInfo, AddLanguages, AddSoftskills } from 'features/forms'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			<Route element={<Outlet />} errorElement={<ErrorBoundary />}>
				<Route path='/' element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />

				<Route element={<PrivateOutlet />}>
					<Route path='user' element={<UserProfile />} />
					<Route path='cv' element={<CreateCV />} />
					<Route path='profile/:id' element={<Profile />} />
					<Route path='info/:id' element={<AddInfo />} />
					<Route path='education/:id' element={<Education />} />
					<Route path='work/:id' element={<Work />} />
					<Route path='hardskills/:id' element={<AddHardskills />} />
					<Route path='softskills/:id' element={<AddSoftskills />} />
					<Route path='languages/:id' element={<AddLanguages />} />
					<Route path='preview/:id' element={<PreviewReact />} />
				</Route>
			</Route>
		</Route>
	)
)

const App = () => {
	return <RouterProvider router={router}  fallback={<p>Loading...</p>}/* {<Fallback />} */ />
}

export default App
