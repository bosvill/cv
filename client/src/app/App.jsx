import './index.css'
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import { FormLayout, Layout, ProfileLayout } from 'app/layouts'
import PrivateOutlet from './PrivateOutlet'

import { Login, Register } from 'pages/auth'
import Home, { NotFoundPage } from 'pages/public'
import { Account, UserHome } from 'pages/user'

import { CoverLetterPage } from 'pages/coverLetter'
import {
  EducationPage,
  HardskillsPage,
  InfoPage,
  LanguagesPage,
  ProfilePage,
  SoftskillsPage,
  StartCvPage,
  TemplatePage,
  WorkPage
} from 'pages/cv'
import { PreviewReact, PreviewReactLetter } from 'widgets/previewReact'
import { ErrorBoundary } from 'shared/ui'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route element={<Outlet />}>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route element={<PrivateOutlet />}>
          <Route element={<FormLayout />}>
            <Route path='create' element={<StartCvPage />} />
            <Route path='cv/:id/template' element={<TemplatePage />} />
            <Route path='cv/:id/profile' element={<ProfilePage />} />
            <Route path='cv/:id/info' element={<InfoPage />} />
            <Route path='cv/:id/education' element={<EducationPage />} />
            <Route path='cv/:id/work' element={<WorkPage />} />
            <Route path='cv/:id/hardskills' element={<HardskillsPage />} />
            <Route path='cv/:id/softskills' element={<SoftskillsPage />} />
            <Route path='cv/:id/languages' element={<LanguagesPage />} />
            <Route path='cv/:id/preview' element={<PreviewReact />} />
          </Route>
          <Route path='cover/:id' element={<CoverLetterPage />} />
          <Route path='cover/:id/preview' element={<PreviewReactLetter />} />
          <Route element={<ProfileLayout />}>
            <Route path='user/cvs' element={<UserHome />} />
            <Route path='user/settings' element={<Account />} />
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider
      router={router}
      fallback={<p>Loading...</p>} /* {<Fallback />} */
    />
  )
}

export default App
