import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

export const baseApi = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User', 'Info', 'CV','Image'],
	endpoints: builder => ({})
})
