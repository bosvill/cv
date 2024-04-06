import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import ApiError from '../utils/ApiError.js'
import {
	findToken,
	generateTokens,
	removeToken,
	saveToken,
	validateRefreshToken
} from './tokenService.js'

const registerUser = async (email, password) => {
	const userExists = await User.findOne({ email })

	if (userExists) {
		throw ApiError.BadRequest(`User with ${email} already exists`)
	}

	const hashPassword = await bcrypt.hash(password, 10)
	const user = await User.create({ email, password: hashPassword })
	const tokens = generateTokens({ userId: user._id })
	await saveToken(user._id, tokens.refreshToken)

	return {
		...tokens,
		email: user.email,
		_id: user._id
	}
}

const loginUser = async (email, password) => {
	const user = await User.findOne({ email })
	console.log(user)
	if (!user) {
		throw ApiError.UnauthorizedError('Access denied!')
		//return res.status(401).json({ message: 'Unauthorized' })
	}

	const isValid = await bcrypt.compare(password, user.password)
	console.log('isValid: ', isValid)
	if (!isValid) {
		throw ApiError.ValidationError('Password not valid')
		//return res.status(401).json({ message: 'Unauthorized' })
	}

	const tokens = generateTokens({ userId: user._id })
	await saveToken(user._id, tokens.refreshToken)

	return {
		...tokens,
		email: user.email,
		_id: user._id
	}
}

const logoutUser = async refreshToken => {
	const token = await removeToken(refreshToken)
	return token
}

const refreshUser = async refreshToken => {
	//console.log('Refesh user service!')
	if (!refreshToken) {
		//throw ApiError.UnauthorizedError('No refresh token! Not authorized to access this resource')
		return res.status(401).json({ message: 'Unauthorized' })
	}

	const userData = validateRefreshToken(refreshToken)

	//console.log('User data at validate refresh token:',userData)
	const tokenFromDB = await findToken(refreshToken)
	//console.log('find tokenFromDB: ',tokenFromDB)
	if (!userData /* || !tokenFromDB */) {
		//throw ApiError.UnauthorizedError('Not authorized to access this resource')
		return res.status(403).json({ message: 'Forbidden' })
	}
	const user = await User.findById(userData.userId)
	if (!tokenFromDB || !user) return res.status(401).json({ message: 'Unauthorized' })
	//console.log('user:', user)
	const tokens = generateTokens({ userId: user._id })
	await saveToken(user._id, tokens.refreshToken)

	return {
		...tokens,
		email: user.email,
		_id: user._id
	}
}

const getAllUsers = async () => {
	const users = await User.find()
	return users
}

const getUserProfile = async id => {
	const user = User.findById(id)
	return user
}

export { getAllUsers, getUserProfile, loginUser, logoutUser, refreshUser, registerUser }
