import { Router } from 'express'

import { deleteImage, uploadImage } from '../controllers/imageController.js'
import { imgUploadMiddleware } from '../middlewares/imgUploadMiddleware.js'

const imgRouter = Router()
const upload = imgUploadMiddleware('cv')


imgRouter.route('/:id/upload').post(upload.single('image'), uploadImage)
imgRouter.route('/:id/destroy').post( deleteImage)

export default imgRouter
