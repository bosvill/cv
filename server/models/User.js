import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: [true, 'User already exists']
		},

		password: {
			type: String,
			reuqired: [true, 'Password is required']
		}
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
