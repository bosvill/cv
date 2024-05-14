import { baseApi} from 'shared/api'

export const imageApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		uploadImage: builder.mutation({
			query: ({ id, image }) => ({
				url: `img/${id}/upload`,
				method: 'POST',
				body: image
			}),
			invalidatesTags: ['CV']
		}),
		deleteImage: builder.mutation({
			query: ({ id, public_id }) => ({
				url: `img/${id}/destroy`,
				method: 'POST',
				body: public_id
			}),
			invalidatesTags: ['CV']
		})
	})
})

export const { useUploadImageMutation, useDeleteImageMutation } = imageApi
