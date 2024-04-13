import { createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
	name: 'image',
	initialState: {}, //url: null, public_id: null
	reducers: {
		setImage: (state, { payload }) => {
			console.log(payload)
			state.img = payload
		},
		resetImage: state => (state.img = null)
	},
	selectors: {
		selectImage: state => state.img
	}
})

export default imageSlice.reducer
export const { setImage, resetImage } = imageSlice.actions
export const { selectImage } = imageSlice.selectors 