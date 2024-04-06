import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'

const generateTokens = payload => {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '24h' })
	return {
		accessToken,
		refreshToken
	}
}

const validateAccessToken = token => {
	try {
		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
		console.log('Validate access token: ', userData)
		return userData
	} catch (err) {
		return null
	}
}

const validateRefreshToken = token => {
	try {
		const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
		return userData
	} catch (err) {
		return null
	}
}

const findToken = async refreshToken => {
	try {
		const token = await Token.findOne({ refreshToken })
		console.log('find token', token)
		return token.refreshToken
	} catch (err) {
		return null
	}
}

const saveToken = async (userId, refreshToken) => {
	const tokenData = await Token.findOne({ user: userId })
	if (tokenData) {
		tokenData.refreshToken = refreshToken
		return tokenData.save()
	}

	const token = await Token.create({ user: userId, refreshToken })
	return token
}

const removeToken = async refreshToken => {
	const token = await Token.deleteOne({ refreshToken })
	return token
}
export {
	findToken,
	generateTokens,
	removeToken,
	saveToken,
	validateAccessToken,
	validateRefreshToken
}
