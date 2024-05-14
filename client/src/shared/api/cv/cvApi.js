import { baseApi } from 'shared/api'

export const cvApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createCV: builder.mutation({
      query: data => ({
        url: `cv`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['CV']
    }),

    getCV: builder.query({
      query: id => ({
        url: `cv/${id}`,
        method: 'GET'
      }),
      /* async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const cvData = await queryFulfilled
          dispatch(setCV(cvData))
        } catch (err) {
          return err
        }
      }, */
      providesTags: ['CV']
    }),

    deleteCV: builder.mutation({
      query: id => ({
        url: `cv/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['CV']
    }),

    getAll: builder.query({
      query: user => ({
        url: `cv/all/${user}`,
        method: 'GET'
      }),
      providesTags: ['CV']
    }),

    updateCV: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `cv/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['CV']
    })
  })
})

export const {
  useGetCVQuery,
  useGetAllQuery,
  useDeleteCVMutation,
  useCreateCVMutation,
  useUpdateCVMutation
} = cvApi
