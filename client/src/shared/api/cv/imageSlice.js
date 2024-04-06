import { createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
	name: 'image',
	initialState: {}, //url: null, public_id: null
	reducers: {
		setImage: (state, { payload }) => {
			console.log(payload)
			//state.url = payload.url
			//state.public_id = payload.public_id
			state.img = payload
		}
	},
	selectors: {
		//selectImageUrl: state => state.url,
		//selectImagePublic_id: state => state.public_id
		selectImage: state => state.img
	}
})

export const { setImage } = imageSlice.actions
export default imageSlice.reducer
export const { selectImage } = imageSlice.selectors //selectImageUrl, selectImagePublic_id, 
