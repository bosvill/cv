import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import { store , persistor} from './store'
import App from './App'
import { Fallback } from 'shared/ui'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store} >
    <PersistGate loading={<Fallback/>} persistor={persistor}>
			<App/>
      </PersistGate>
		</Provider>
	</React.StrictMode>
)
