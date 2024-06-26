import { baseApi, logout, setCredentials } from 'shared/api'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query({
      query: id => ({
        url: `user/profile/${id}`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    // User registration
    signUp: builder.mutation({
      query: credentials => ({
        url: 'user',
        method: 'POST',
        body: { ...credentials }
      }),
      invalidatesTags: ['User']
    }),
    login: builder.mutation({
      query: credentials => ({
        url: 'user/login',
        method: 'POST',
        body: { ...credentials }
      }),
      providesTags: ['User'],
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('Data: ', data)
          if (Object.keys(data).length > 0) {
            dispatch(setCredentials(data))
          }
        } catch (error) {
          dispatch(setCredentials(null))
          return error
        }
      }
      //transformErrorResponse: (response, meta, arg) => response.data.message
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: 'user/logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('Logout QueryFullfilled Data: ', data)
          dispatch(logout())
          dispatch(baseApi.util.resetApiState())
        } catch (err) {
          return err
        }
      },
      invalidatesTags: ['User']
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'user/refresh',
        method: 'GET',
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const userData = await queryFulfilled
            dispatch(setCredentials(userData.data))
          } catch (err) {
            return err
          }
        }
      }),
      invalidatesTags: ['User']
    })
  })
})

export const {
  useSignUpMutation,
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useGetProfileQuery
} = authApi
