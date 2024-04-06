import multer from 'multer'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
//import cloudinary from '../config/cloudinary.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})


const uploadMiddleware = folderName => {
	const storage = new CloudinaryStorage({
		cloudinary: cloudinary,
		params: (req, file) => {
			const folderPath = `${folderName.trim()}` // Update the folder path here
			//const fileExtension = path.extname(file.originalname).substring(1)
			const publicId = `${file.fieldname}-${Date.now()}`

			return {
				folder: folderPath,
				public_id: publicId
			}
		}
	})

	return multer({
		storage: storage,
		limits: {
			fileSize: 5 * 1024 * 1024 // keep images size < 5 MB
		}
	})
}

export default uploadMiddleware
