import { validationResult } from 'express-validator'
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser
} from '../services/userService.js'
import ApiError from '../utils/ApiError.js'
import tryCatch from '../utils/tryCatch.js'

// POST api
const register = tryCatch(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(ApiError.Validation('Validation error', errors.array()))
  }
  const { email, password } = req.body
  if (!email || !password) {
    return next(ApiError.BadRequest('Missing credentials'))
  }
  const data = await registerUser(email, password)
  res.cookie('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000
  })
  return res.status(201).json({
    accessToken: data.accessToken,
    _id: data._id,
    email: data.email,
    message: 'Registration successful!'
  })
})

// POST api/login
const login = tryCatch(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(ApiError.BadRequest('Missing credentials'))
  }
  const data = await loginUser(email, password)
  console.log(data)
  res.cookie('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000
  })
  return res.status(200).json({
    accessToken: data.accessToken,
    _id: data._id,
    email: data.email,
    message: 'Login successful!'
  })
})

// POST api/logout
const logout = tryCatch(async (req, res, next) => {
  const { refreshToken } = req.cookies
  await logoutUser(refreshToken)
  res.clearCookie('refreshToken')
  return res.status(200).json({ message: 'Logout successful' })
})

// GET api/refresh
const refresh = tryCatch(async (req, res, next) => {
  const { refreshToken } = req.cookies
  if (!refreshToken) {
    return next(ApiError.BadRequest('Missing token'))
  }

  const data = await refreshUser(refreshToken)
  //console.log('User data at refresh: ', userData)
  res.cookie('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000
  })
  return res.status(200).json({
    accessToken: data.accessToken,
    _id: data._id,
    email: data.email,
    message: 'Refresh successful!'
  })
})

// GET api/user/profile/:id
const getProfile = tryCatch(async (req, res, next) => {
  const { _id } = req.params
  const data = await getUserProfile(id)
  return res
    .status(201)
    .json({ _id: data._id, email: data.email, message: 'Profile' })
})

// PUT api/user/profile/:id
const updateProfile = tryCatch(async (req, res, next) => {
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

export { getProfile, getUsers, login, logout, refresh, register, updateProfile }
