import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import ApiError from '../utils/ApiError.js'

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})

const imgUploadMiddleware = folderName => {
	const storage = new CloudinaryStorage({
		cloudinary: cloudinary,
		params: (req, file) => {
			//console.log('upload MW req:', req)
			//console.log('upload MW file:', file)
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
		},
		fileFilter: (req, file, cb) => {
			if (
				file.mimetype == 'image/png' ||
				file.mimetype == 'image/jpg' ||
				file.mimetype == 'image/jpeg' ||
				file.mimetype == 'image/webp'
			) {
				cb(null, true)
			} else {
				return cb(ApiError.ValidationError('Invalid mime type'))
			}
		}
	})
}

export default imgUploadMiddleware
