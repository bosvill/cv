import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  // base url of backend API
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})
