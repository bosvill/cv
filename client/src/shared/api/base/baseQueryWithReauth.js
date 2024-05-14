import { logout, setCredentials } from '../auth/authSlice'
import { baseQuery } from './baseQuery'

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  // baseQuery works while access token is valid
  let result = await baseQuery(args, api, extraOptions)
  //console.log('Result: ', result)
  if (
    result?.error?.status === 401 &&
    result?.error?.data?.message === 'ApiError: jwt expired'
  ) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
    //console.log('sending refresh token 1')
    //console.log('refresh refreshResult: ', refreshResult)
    if (refreshResult) {
      // store the new token
      api.dispatch(setCredentials({...refreshResult.data}))
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  if (result?.error?.status === 401) {
    console.log('sending refresh token 2')
    const { error } = result
    return { error }
  }

  if (result?.error?.status === 422) {
    const { error } = result
    return { error }
  }

  return result
}
