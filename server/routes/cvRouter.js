import { Router } from 'express'
import auth from '../middlewares/authHandler.js'
import { deleteCV, getAllCV, getCV, createCV, updateCV } from '../controllers/cvController.js'
const cvRouter = Router()
cvRouter.route('/').post(auth,createCV)
cvRouter.route('/all/:user').get(auth,getAllCV)
cvRouter.route('/:id').get(auth,getCV).delete(auth,deleteCV).patch(auth,updateCV)

export default cvRouter
