import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './db/db.js'
import errorResponse from './middlewares/errorMiddleware.js'

import userRouter from './routes/userRouter.js'
import cvRouter from './routes/cvRouter.js'
import imgRouter from './routes/imgRouter.js'
import { corsOptions } from './config/corsOptions.js'

//DB connection
connectDB()

const app = express()

// apply default middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/api/user', userRouter)
app.use('/api/cv', cvRouter)
app.use('/api/img', imgRouter)

app.use(errorResponse)

app.listen(process.env.PORT, () =>
	console.log(`Server started on http://127.0.0.1:${process.env.PORT}`)
)
