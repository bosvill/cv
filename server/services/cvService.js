import CV from '../models/CV.js'

const createCv = async data => {
	const result = await CV.create(data)
	return result
}

const displayCv = async id => {
	return await CV.findOne({ _id: id })
}

const updateCv = async (id, data) => {
	console.log('update service: ', data)
	 if (Object.keys(data).includes('education')) {
		return await CV.findByIdAndUpdate(
			id,
			{ $set: { education: data.education } },
			{ new: true }
		)
	}
	if (Object.keys(data).includes('work')) {
		return await CV.findByIdAndUpdate(
			id,
			{ $set: { work: data.work } },
			{ new: true }
		)
	}

	if (Object.keys(data).includes('languages')) {
		return await CV.findByIdAndUpdate(
			id,
			{ $set: { languages: data.languages } },
			{ new: true }
		)
	}

	if (Object.keys(data).includes('hardskills')) {
		return await CV.findByIdAndUpdate(
			id,
			{ $set:  {hardskills: data.hardskills}  },
			{ new: true }
		)
	}

	if (Object.keys(data).includes('softskills')) {
		return await CV.findByIdAndUpdate(
			id,
			{ $set:  {softskills: data.softskills}  },
			{ new: true }
		)
	}
	
	return await CV.findByIdAndUpdate(id, data, { new: true })
}

const removeCv = async id => {
	return await CV.findByIdAndDelete(id)
}

const getAllCvs = async id => {
	const cvs = await CV.find({ user: id })
	return cvs
}

export { createCv, displayCv, getAllCvs, removeCv, updateCv }
