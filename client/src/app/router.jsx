import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import { ErrorBoundary } from 'shared/ui'
import AppLayout from './Layout'
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
		<Route element={<AppLayout />} errorElement={<ErrorBoundary />}>
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
	)
)

export default router
