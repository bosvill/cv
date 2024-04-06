import { Router } from 'express'
import auth from '../middlewares/authHandler.js'
import { body } from 'express-validator'
import {
	register,
	login,
	logout,
	refresh,
	getProfile,
	updateProfile,
	getUsers
} from '../controllers/userController.js'

const userRouter = Router()
userRouter
	.route('/')
	.post(body('email').isEmail(), body('password').isLength({ min: 4, max: 20 }), register)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(logout)
userRouter.route('/profile/:id').get(auth, getProfile).put(auth, updateProfile)
userRouter.route('/refresh').get(refresh)
userRouter.route('/all').get(auth, getUsers)
export default userRouter
