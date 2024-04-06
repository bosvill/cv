import mongoose from 'mongoose'

// refresh token
const tokenSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true }
})

const Token = mongoose.model('Token', tokenSchema)

export default Token
