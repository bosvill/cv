import { baseApi, resetImage } from 'shared/api'
import { setImage } from 'shared/api'

export const imageApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		uploadImage: builder.mutation({
			query: ({ id, image }) => ({
				url: `img/${id}/upload`,
				method: 'POST',
				body: image
			}),
			/* 	async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const imageData = await queryFulfilled
					console.log(imageData)
					imageData.data.success
						? dispatch(
								setImage({
									url: imageData.data.image.path,
									public_id: imageData.data.image.originalname
								})
						  )
						: console.log('Mutation Response: ', imageData)
				} catch (err) {
					return err
				}
			}, */
			invalidatesTags: ['CV']
		}),
		deleteImage: builder.mutation({
			query: ({ id, public_id }) => ({
				url: `img/${id}/destroy`,
				method: 'POST',
				body: public_id
			}),
			/* async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				console.log(arg)
				try {
                    const imageData = await queryFulfilled
										imageData.data.success
											? dispatch(
													resetImage()
											  )
											: console.log('Mutation Response: ', imageData)
					  await queryFulfilled
					//console.log('QueryFullfilled Data: ' + JSON.stringify(data))
					//localStorage.setItem('persist', userData.data.persist)
					//dispatch(resetImage())
					//dispatch(baseApi.util.resetApiState())
				} catch (err) {
					return err
				}
			}, */
			invalidatesTags: ['CV']
		})
	})
})

export const { useUploadImageMutation, useDeleteImageMutation } = imageApi
