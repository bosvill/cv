import { validationResult } from 'express-validator'
import wrapAsync from '../utils/wrapAsync.js'
import {
	registerUser,
	loginUser,
	logoutUser,
	refreshUser,
	getAllUsers,
	getUserProfile
} from '../services/userService.js'
import ApiError from '../utils/ApiError.js'

// POST api
const register = wrapAsync(async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return next(ApiError.ValidationError('Validation error', errors.array()))
		/* const err = new Error(`Validation error`, { cause: errors.array() })
		err.name = 'ValidationError'
		throw err */
	}
	const { email, password } = req.body
	const userData = await registerUser(email, password)
	res.cookie('refreshToken', userData.refreshToken, {
		httpOnly: true,
		//secure: process.env.NODE_ENV !== 'development',
		//sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000
	})
	return res.status(201).json({
		accessToken: userData.accessToken,
		id: userData._id,
		message: 'Registration successful!'
	})
})

// POST api/login
const login = wrapAsync(async (req, res, next) => {
	const { email, password } = req.body
	const userData = await loginUser(email, password)
	res.cookie('refreshToken', userData.refreshToken, {
		httpOnly: true,
		//secure: process.env.NODE_ENV !== 'development',
		//sameSite: 'None',
		maxAge: 24 * 60 * 60 * 1000
	})
	return res.status(200).json({
		accessToken: userData.accessToken,
		id: userData._id,
		message: 'Login successful!'
	})
})

// POST api/logout
const logout = wrapAsync(async (req, res, next) => {
	const { refreshToken } = req.cookies
	//console.log(refreshToken)
	await logoutUser(refreshToken)
	res.clearCookie('refreshToken')
	return res.status(200).json({ message: 'Logout successful' })
})

// GET api/refresh
const refresh = wrapAsync(async (req, res, next) => {
	const cookies = req.cookies

	if (!cookies?.refreshToken) return res.status(401).json({ message: 'Unauthorized' })
	const { refreshToken } = req.cookies
	console.log(refreshToken)
	const userData = await refreshUser(refreshToken)
	//console.log('User data at refresh: ', userData)
	res.cookie('refreshToken', userData.refreshToken, {
		httpOnly: true,
		//secure: process.env.NODE_ENV !== 'development',
		//sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000
	})
	return res.status(200).json({
		accessToken: userData.accessToken,
		id: userData._id,
		message: 'Refresh successful!'
	})
})

// GET api/users/profile
const getProfile = wrapAsync(async (req, res, next) => {
	const { id } = req.params
	const userInfo = await getUserProfile(id)
	return res.status(201).json({ userInfo, message: 'Profile' })
})

// PUT api/users/profile
const updateProfile = wrapAsync(async (req, res, next) => {
	return res.status(201).json({ message: 'Profile updated' })
})

// GET api/users/all
const getUsers = async (req, res, next) => {
	try {
		const users = await getAllUsers()
		return res.json(users)
	} catch (err) {
		next(err)
	}
}

export { register, login, logout, getProfile, updateProfile, refresh, getUsers }
