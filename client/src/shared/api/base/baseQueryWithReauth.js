import { logout, setCredentials } from '../auth/authSlice'
import { baseQuery } from './baseQuery'

export const baseQueryWithReauth = async (args, api, extraOptions) => {
	
		let result = await baseQuery(args, api, extraOptions)
		console.log(result)

		// If you want, handle other status codes, too
		if (result?.error?.status === 403) {
			console.log('sending refresh token')
			// send refresh token to get new access token
			const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
			//console.log('RefreshResult: ', refreshResult)
			if (refreshResult?.data) {
				//const user=api.getState().auth.user
				// store the new token
				api.dispatch(setCredentials({ ...refreshResult.data })) //user
				// retry original query with new access token
				result = await baseQuery(args, api, extraOptions)
			} else {
				/* if (refreshResult?.error?.status === 403) {
				refreshResult.error.data.message = 'Your login has expired.'
			} */
				api.dispatch(logout())
				return refreshResult
			}
		}

		if (result?.error?.status === 401) {
			const { error } = result
			return {error}
		}

		if (result?.error?.status === 422) {
			const { error } = result
			return {error}
		}

		return result
	
}
