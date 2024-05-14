import { Outlet, useNavigation } from 'react-router-dom'
import { Fallback } from 'shared/ui'
import Footer from 'widgets/Footer'
import Header from 'widgets/Header'

export const Layout = () => {
  const navigation = useNavigation()
  return (
    <>
      {navigation.state === 'loading' && <Fallback />}
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
