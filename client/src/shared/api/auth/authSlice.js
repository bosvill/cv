import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { _id: null, token: null },
  reducers: {
    setCredentials: (state, { payload }) => {
      console.log(payload)
      const { accessToken, _id, email } = payload
      state.email = email
      state.token = accessToken
      state._id = _id
    },

    logout: state => {
      state.token = null
      state._id = null
      state.email = null
    }
  },

  selectors: {
    selectToken: state => state.accessToken,
    selectUser: state => state._id,
    selectEmail: state => state.email
  }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
export const { selectToken, selectUser, selectEmail } = authSlice.selectors
