import {cloudinary}  from '../config/cloudinary.js'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import ApiError from '../utils/ApiError.js'



const imgUploadMiddleware = folderName => {
	const storage = new CloudinaryStorage({
		cloudinary: cloudinary,
		params: (req, file) => {
			console.log(req.params)
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
				return cb(ApiError.Validation('Invalid file type'))
			}
		}
	})
}
//409: Already exists

export { imgUploadMiddleware }
