class ApiError extends Error {
  status
  errors
  constructor(status, message, errors = []) {
    super(message)
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name
    this.status = status
    this.errors = errors
  }

  // error instances without new keyword
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors)
  }
  static Validation(message, errors = []) {
    return new ApiError(422, message, errors)
  }
  // user not logged in
  static Unauthorized(message) {
    return new ApiError(401, message) // Token is missing,expired, revoked, malformed, or invalid for other reasons
  }
  // no privileges
  static Forbidden(message) {
    return new ApiError(403, message) //, 'No permission'
  }

  static NotFound() {
    return new ApiError(404, 'Resource not found')
  }
}

export default ApiError
