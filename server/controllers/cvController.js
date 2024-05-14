import { createCv, displayCv, getAllCvs, removeCv, updateCv } from '../services/cvService.js'
import ApiError from '../utils/ApiError.js'
import tryCatch from '../utils/tryCatch.js'

const createCV = tryCatch(async (req, res, next) => {
	const cv = await createCv(req.body)
  if(!cv){
    return next(ApiError.BadRequest('Missing data'))
  }
	return res.status(201).json({ cv, message: 'Successfully created' })
})

const getAllCV = tryCatch(async (req, res, next) => {
	const { user } = req.params
  if(!user){
    return next(ApiError.BadRequest('Missing user'))
  }
	const cvs = await getAllCvs(user)
	
	return res.json({ cvs, message: 'Sent all saved CVs for this user' })
})

const getCV = tryCatch(async (req, res, next) => {
	const { id } = req.params
	const cv = await displayCv(id)
	return res.json({ cv, message: 'One CV sent' })
})

const updateCV = tryCatch(async (req, res, next) => {
	const { _id } = req.params
	console.log('update controller: ', req.body)
	console.log('update controller2: ', req.body.data)
	// for arrays req.body.data is undefined
	let cv
	if (req.body.data === undefined) {
		cv = await updateCv(_id, req.body)
	} else {
		cv = await updateCv(_id, req.body.data)
	}

	return res.status(202).json({ cv, message: 'Update successful!' })
})

const deleteCV = tryCatch(async (req, res, next) => {
	const { _id } = req.params
	await removeCv(_id)
	return res.status(202).json({ success: true, message: 'Deleted this CV' })
})

export { createCV, deleteCV, getAllCV, getCV, updateCV }
