import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'
import ApiError from '../utils/ApiError.js'

const generateTokens = payload => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`
  })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}m`
  })
  return {
    accessToken,
    refreshToken
  }
}

const validateAccessToken = token => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET,
    (err, user) => {
      if (err) {
        throw ApiError.Unauthorized(err.message)
      }
      console.log('decoded at validate', user)
      return user
    }
  )
  return decoded
}

const validateRefreshToken = token => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    console.log('Decoded at validateRefreshToken: ', decoded)
    return decoded
  } catch (err) {
    return null
  }
}

const findToken = async refreshToken => {
  try {
    //find if refresh Token in DB and return DB entry
    const token = await Token.findOne({ refreshToken })
    console.log('find token', token)
    return token.refreshToken
  } catch (err) {
    return null
  }
}

const saveToken = async (userId, refreshToken) => {
  //find existing refresh Token and overwrite it with new one
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
