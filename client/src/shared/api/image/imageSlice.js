import { createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
	name: 'image',
	initialState: {}, //url: null, public_id: null
	reducers: {
		setImage: (state, { payload }) => {
			console.log(payload)
			state.image = payload
		},
		resetImage: state => (state.image = null)
	},
	selectors: {
		selectImage: state => state.image
	}
})

export default imageSlice.reducer
export const { setImage, resetImage } = imageSlice.actions
export const { selectImage } = imageSlice.selectors
