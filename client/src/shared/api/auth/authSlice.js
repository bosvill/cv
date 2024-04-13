import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: { id: null, token: null },
	reducers: {
		setCredentials: (state, { payload }) => {
			//console.log(action.payload)
			const { accessToken, id,email } = payload
			state.email=email
			state.token = accessToken
			state.id = id
		},

		logout: state => {
			state.token = null
			state.id = null
		}
	},
	
	selectors: {
		selectToken: state => state.accessToken,
		selectUser: state => state.id,
		selectEmail:state=>state.email
	}
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
export const { selectToken, selectUser ,selectEmail} = authSlice.selectors
