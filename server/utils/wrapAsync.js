// try-catch wrapper for async functions
const wrapAsync = fn => {
	return (req, res, next) => fn(req, res, next).catch(e => next(e))
}

export default wrapAsync

/* function wrapAsync(fn){
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
} */
