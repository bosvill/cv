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
	static ValidationError(message, errors = []) {
		return new ApiError(422, message, errors)
	}
// user not logged in
	static UnauthorizedError(message) {
		return new ApiError(401, message) //, 'User not authenticated'
	}
// login expired
	static  UnauthenticatedError(message) {
		return new ApiError(403,message) //, 'Not authorized'
	}

	static NotFound() {
		return new ApiError(404, 'Resource not found')
	}
}

/* class ValidationError extends ApiError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
 */
export default ApiError
