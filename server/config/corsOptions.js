export const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
	optionsSuccessStatus: 200
}

/* origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
}

const allowedOrigins=[]
 */
