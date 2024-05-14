import ApiError from '../utils/ApiError.js'
const errorResponse = (err, req, res, next) => {
  console.error(err)

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
  }

  return res.status(500).json({ message: 'Oops, something went wrong' })
}

export default errorResponse
