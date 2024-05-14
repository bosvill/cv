import { validateAccessToken } from '../services/tokenService.js'
import ApiError from '../utils/ApiError.js'

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) {
      return next(
        ApiError.Unauthorized('Not authorized to access this resource')
      )
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.Unauthorized('No access token header'))
    }

    const decoded = validateAccessToken(accessToken)
console.log('decoded at auth middleware: ', decoded)
    if (!decoded) {
      //return res.status(403).json({ message: 'Forbidden' })
      return next(ApiError.Unauthorized('Cannot validate access token'))
    }

    req.user = decoded
    next()
  } catch (err) {
    return next(ApiError.Unauthorized(err))
  }
}

export default auth
