import ApiError from '../utils/ApiError.js'
import wrapAsync from '../utils/wrapAsync.js'
import { removePhoto } from '../services/imageService.js'

const uploadImage = wrapAsync(async (req, res, next) => {
	const image = req.file
	if (!image) {
		// No file was uploaded
		return next(new ApiError(400, 'No file uploaded!'))
		/*  return res.status(400).json({ error: "No file uploaded" }); */
	}

	// File upload successful
	//const fileUrl = req.file.path // URL of the uploaded file in Cloudinary

	// Perform any additional logic or save the file URL to a database
	//await CV.findOne()
	console.log(image)
	res.status(201).json({ success: true, message: 'Image uploaded!', image })
})

/* delete an image */
const deleteImage = wrapAsync(async (req, res, next) => {
	const {public_id}=req.params
	console.log(public_id)
	await removePhoto(public_id)
	//const result = req.file
	//console.log('deleteImg: ',result)

	res.status(202).json({
		message: 'Image deleted'
	})
})

export { deleteImage, uploadImage }
