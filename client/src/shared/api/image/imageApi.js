import { baseApi, resetImage } from 'shared/api'
import { setImage } from 'shared/api'

export const imageApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		uploadImage: builder.mutation({
			query: data => ({
				url: 'img/upload',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
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
			},
			invalidatesTags: ['CV']
		}),
		deleteImage: builder.mutation({
			query: public_id => ({
				url: `img/delete/${public_id}`,
				method: 'DELETE'
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
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
			},
			invalidatesTags: ['CV']
		})
	})
})

export const { useUploadImageMutation, useDeleteImageMutation } = imageApi
