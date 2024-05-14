// try-catch wrapper for async functions
const tryCatch = fn => {
	return (req, res, next) => fn(req, res, next).catch(e => next(e))
}

export default tryCatch

