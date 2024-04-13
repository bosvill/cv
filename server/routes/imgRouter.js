import { Router } from 'express'
import auth from '../middlewares/authHandler.js'

import { uploadImage, deleteImage } from '../controllers/imageController.js'
import imgUploadMiddleware from '../middlewares/imgUploadMiddleware.js'
import { remove } from '../services/imageService.js'

const imgRouter = Router()
const upload = imgUploadMiddleware('cv')

imgRouter.route('/upload').post(upload.single('image'), uploadImage)
imgRouter.route('/delete/:id').delete(remove,deleteImage)

export default imgRouter
