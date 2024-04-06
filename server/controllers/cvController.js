import { createCv, displayCv, getAllCvs, removeCv, updateCv } from '../services/cvService.js'
import wrapAsync from '../utils/wrapAsync.js'

const createCV = wrapAsync(async (req, res, next) => {
	const cv = await createCv(req.body)
	return res.status(201).json({ success: true, message: 'Successfully created', cv })
})

const getAllCV = wrapAsync(async (req, res, next) => {
	const { user } = req.params
	const cvs = await getAllCvs(user)
	//console.log('allCVs', allCVs)
	return res.json({ cvs, message: 'Sent all saved CVs for this user' })
})

const getCV = wrapAsync(async (req, res, next) => {
	const { id } = req.params
	const cv = await displayCv(id)
	return res.json({ cv, message: 'One CV sent' })
})

const updateCV = wrapAsync(async (req, res, next) => {
	const { id } = req.params
	console.log('update controller: ', req.body)
	console.log('update controller2: ', req.body.data)
	// for arrays req.body.data is undefined
	let cv
	if (req.body.data === undefined) {
		cv = await updateCv(id, req.body)
	} else {
		cv = await updateCv(id, req.body.data)
	}

	return res.status(202).json({ cv, message: 'Update successful!' })
})

const deleteCV = wrapAsync(async (req, res, next) => {
	const { id } = req.params
	await removeCv(id)
	return res.status(202).json({ success: true, message: 'Deleted this CV' })
})

export { createCV, deleteCV, getAllCV, getCV, updateCV }
