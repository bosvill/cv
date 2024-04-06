import { baseApi } from 'shared/api'
import { setImage } from 'shared/api'
import { setCV } from 'shared/api'

const cvApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createCV: builder.mutation({
			query: data => ({
				url: `cv`,
				method: 'POST',
				body: data
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const cvData = await queryFulfilled
					cvData.data.success
						? dispatch(setCV({ id: cvData.data.created._id, user: cvData.data.created.user }))
						: console.log('cv Data from query: ', cvData)
				} catch (err) {
					return err
				}
			},
			invalidatesTags: ['CV']
		}),

		getCV: builder.query({
			query: id => ({
				url: `cv/${id}`,
				method: 'GET',
				async onQueryStarted(arg, { dispatch, queryFulfilled }) {
					try {
						const cvData = await queryFulfilled
						console.log('cv Data from query: ', cvData)
						//dispatch(setCV(cvData.data.cv))
					} catch (err) {
						return err
					}
				}
			}),
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
			})
		}),

		updateCV: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `cv/${id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['CV']
		}),

		uploadImage: builder.mutation({
			query: data => ({
				url: 'cv/upload',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const imageData = await queryFulfilled
					imageData.data.success
						? dispatch(
								setImage({
									url: imageData.data.image.path,
									public_id: imageData.data.image.originalname
								})
						  )
						: console.log(imageData)
				} catch (err) {
					return err
				}
			},
			invalidatesTags: ['Image']
		})
	})
})

export const {
	useGetCVQuery,
	useGetAllQuery,
	useDeleteCVMutation,
	useCreateCVMutation,
	useUpdateCVMutation,
	useUploadImageMutation
} = cvApi
