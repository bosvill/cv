import { validateAccessToken } from '../services/tokenService.js'
import ApiError from '../utils/ApiError.js'

/* const auth = wrapAsync(async (req, res, next) => {
	//console.log(req.headers)
	const authHeader = req.headers.authorisation
	//console.log('AuthHeader: ', authHeader)
	if (!authHeader) {
		return next(ApiError.UnauthorizedError('Not authorized to access this resource'))
	}

	const accessToken = authHeader.split(' ')[1]
	if (!accessToken) {
		return next(ApiError.UnauthenticatedError('No access token header'))
	}

	const userData = validateAccessToken(accessToken)
	if (!userData) {
		return next(ApiError.UnauthenticatedError('Cannot validate access token'))
	}

	req.user = userData
	next()
})
 */

const auth = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorisation
		//console.log('AuthHeader: ', authHeader)
		if (!authHeader) {
			return next(ApiError.UnauthorizedError('Not authorized to access this resource'))
		}

		const accessToken = authHeader.split(' ')[1]
		if (!accessToken) {
			return next(ApiError.UnauthenticatedError('No access token header'))
		}

		const userData = validateAccessToken(accessToken)
		if (!userData) {
			//return res.status(403).json({ message: 'Forbidden' })
			return next(ApiError.UnauthenticatedError('Cannot validate access token'))
		}

		req.user = userData
		next()
	} catch (err) {
		return next(ApiError.UnauthorizedError())
	}
}
export default auth
