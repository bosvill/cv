import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { Fallback } from 'src/shared/ui'
import router from './router'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store} /* loading={<Fallback />} */>
			<RouterProvider router={router} fallbackElement={<Fallback />} />
		</Provider>
	</React.StrictMode>
)
