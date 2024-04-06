import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: { id: null, token: null },
	reducers: {
		setCredentials: (state, { payload }) => {
			//console.log(action.payload)
			const { accessToken, id } = payload
			state.token = accessToken
			state.id = id
		},

		logout: state => {
			state.token = null
			state.id = null
		}
	},
	// update cvSlice with user id on successful login
	/* extraReducers: builder => {
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
			state.cv.user = payload.id
		})
	}, */
	selectors: {
		selectToken: state => state.accessToken,
		selectUser: state => state.id
	}
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
export const { selectToken, selectUser } = authSlice.selectors
