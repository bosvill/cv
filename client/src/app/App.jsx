import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Outlet
} from 'react-router-dom'
import './index.css'
import { ErrorBoundary } from 'shared/ui'
import Layout from './layouts/Layout'
import FormLayout from './layouts/FormLayout'
import PrivateOutlet from './PrivateOutlet'
import { UserProfile } from 'pages/user'
import { Login, Register } from 'pages/auth'
import Home, { NotFoundPage } from 'pages/public'
import { PreviewReact } from 'widgets/previewReact'
import { CreateCV, ChangeTemplate } from 'features/forms'
import {
	ProfilePage,
	EducationPage,
	InfoPage,
	LanguagesPage,
	WorkPage,
	SoftskillsPage,
	HardskillsPage
} from 'pages/cv'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />} errorElement={<ErrorBoundary />}>
			<Route element={<Outlet />}>
				<Route path='/' element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />

				<Route element={<PrivateOutlet />}>
					<Route element={<FormLayout />}>
						<Route path='create' element={<CreateCV />} />
						<Route path='cv/:id/template' element={<ChangeTemplate />} />
						<Route path='cv/:id/profile' element={<ProfilePage />} />
						<Route path='cv/:id/info' element={<InfoPage />} />
						<Route path='cv/:id/education' element={<EducationPage />} />
						<Route path='cv/:id/work' element={<WorkPage />} />
						<Route path='cv/:id/hardskills' element={<HardskillsPage />} />
						<Route path='cv/:id/softskills' element={<SoftskillsPage />} />
						<Route path='cv/:id/languages' element={<LanguagesPage />} />
						<Route path='cv/:id/preview' element={<PreviewReact />} />
					</Route>
					<Route path='user' element={<UserProfile />} />
				</Route>
			</Route>
			<Route path='*' element={<NotFoundPage />} />
		</Route>
	)
)

const App = () => {
	return <RouterProvider router={router} fallback={<p>Loading...</p>} /* {<Fallback />} */ />
}

export default App
