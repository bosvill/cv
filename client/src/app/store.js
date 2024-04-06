import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import authReducer from 'shared/api/auth/authSlice'
import imageReducer from 'shared/api/cv/imageSlice'
import cvReducer from 'shared/api/cv/cvSlice'
import { baseApi } from 'shared/api/base/baseApi'

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		auth: authReducer,
		image: imageReducer,
		cv: cvReducer
		//education: educationReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})

// required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)
