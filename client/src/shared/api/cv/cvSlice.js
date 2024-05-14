import { createSlice } from '@reduxjs/toolkit'
import {cvApi} from './cvApi'

/* const initialState = {
	cv: {
		user: null,
		template:null,
		image: { url: null, name: null },
		firstName: null,
		lastName: null,
		position: null,
		profile: null,
		street: null,
		strNum: null,
		zip: null,
		city: null,
		country: null,
		email: null,
		phone: null,
		homepage: null,
		linkedIn: null,
		github: null,
		hardskills: [],
		softskills: [],
		languages: [],
		education: [],
		work: []
	}
} */
const cvSlice = createSlice({
  name: 'cv',
  initialState: {},
  reducers: {
    /* setCV: (state, { payload }) => {
			console.log(payload)
			state.cv = payload
		} */
  },
  extraReducers: builder => {
    builder
    .addMatcher(
      cvApi.endpoints.getCV.matchFulfilled,
      (state, { payload }) => {
        state.cv = payload
      }
    )
    
  },
  selectors: {
    selectCV: state => state.id
  }
})

export default cvSlice.reducer
export const { setCV } = cvSlice.actions
export const { selectCV } = cvSlice.selectors
