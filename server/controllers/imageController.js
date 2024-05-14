import { cloudinary } from '../config/cloudinary.js'
import CV from '../models/CV.js'
import ApiError from '../utils/ApiError.js'
import tryCatch from '../utils/tryCatch.js'

// api/img/:id/upload
const uploadImage = tryCatch(async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return next(ApiError.BadRequest('Try again'))
  }

  if (!req.file) {
    // No file was uploaded
    return next(ApiError.BadRequest(400, 'No file uploaded!'))
  }

  console.log(req.file)
  // File upload successful
  const { filename: public_id, path: url } = req.file

  // Save the file to a database
  const cv = await CV.findByIdAndUpdate(
    id,
    { $set: { image: { url, public_id } } },
    { new: true }
  )

  return res.status(201).json({ success: true, message: 'Image uploaded!', cv })
})

// api/img/:id/destroy

const deleteImage = tryCatch(async (req, res, next) => {
  const { _id } = req.params
  const public_id = req.body
  const result = await cloudinary.uploader.destroy(
    public_id,
    (result, error) => {
      //,'Image deleted'
      console.log(result)
      if (error) {
        return next(ApiError(error.status, error.message))
      }
    }
  )
  console.log(result)
  // Delete file from a database
  const cv = await CV.findByIdAndUpdate(
    _id,
    { $set: { image: null } }, // { url: '', public_id: '' }
    { new: true }
  )
  return res.status(202).json({
    message: 'Image deleted',
    cv
  })
})

export { deleteImage, uploadImage }
