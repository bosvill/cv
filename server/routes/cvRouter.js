import { Router } from 'express'
import auth from '../middlewares/authHandler.js'
import { deleteCV, getAllCV, getCV, createCV, updateCV } from '../controllers/cvController.js'
import { uploadImage } from '../controllers/imageController.js'
import uploadMiddleware from '../middlewares/uploadMiddleware.js'

const cvRouter = Router()
const upload = uploadMiddleware('cv')

cvRouter.route('/upload').post(upload.single('image'), uploadImage)

cvRouter.route('/').post(auth,createCV)
cvRouter.route('/all/:user').get(auth,getAllCV)
cvRouter.route('/:id').get(auth,getCV).delete(auth,deleteCV).patch(auth,updateCV)

export default cvRouter
