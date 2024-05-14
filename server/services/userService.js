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
  if (!user) {
    throw ApiError.BadRequest('User not valid')
  }

  const isValid = bcrypt.compare(password, user.password)
  if (!isValid) {
    throw ApiError.BadRequest('Password not valid')
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
  //console.log('Refresh User endpoint hit')
  const decoded = validateRefreshToken(refreshToken)
  //console.log('decoded at refreshUser service:', decoded)

  const tokenFromDB = await findToken(refreshToken)
  //console.log('tokenFromDB at refreshUser service: ', tokenFromDB)

  if (!decoded) {
    throw ApiError.Unauthorized('Token issues')
  }

  const user = await User.findById(decoded.userId)
  //console.log('user at refreshUser service:', user)
  if (!tokenFromDB || !user) {
    throw ApiError.Unauthorized('Unauthorized')
  }
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
  const user = User.findById(id).select('email')
  return user
}

export {
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser
}
