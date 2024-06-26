import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI)
			console.log(`MongoDB connected`) //: ${conn.connection.host}
	} catch (err) {
		console.error(`Error: ${err.message}`)
        process.exit(1)
	}
}

export default connectDB
