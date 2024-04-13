import { z } from 'zod'

 const MAX_UPLOAD_SIZE = 1024 * 1024 * 5 // 5MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

export const imageSchema = z
	.instanceof(File)
	.optional()
	.refine(file => {
		return !file || file.size <= MAX_UPLOAD_SIZE
	}, 'File size must be less than 5MB')
	.refine(file => {
		return ACCEPTED_FILE_TYPES.includes(file.type)
	}, 'File must be a png,jpeg,jpg or webp') 

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

/* export const imageSchema = z.object({
	image: z
		.instanceof(File)
		.optional()
		.refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported'
		)
}) */