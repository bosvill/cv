import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

import authReducer from 'shared/api/auth/authSlice'
import { baseApi } from 'shared/api/base/baseApi'
import cvReducer from 'shared/api/cv/cvSlice'
import letterReducer from 'shared/api/letter/letterSlice'

const authPersistConfig = {
  key: 'auth',
  storage: storageSession
}
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistReducer(authPersistConfig, authReducer),
    letter: letterReducer,
    cv: cvReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    )
})

// required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export const persistor = persistStore(store)
