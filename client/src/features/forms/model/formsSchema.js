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
	}, 'Only .jpg, .jpeg, .png and .webp formats are supported')

export const infoSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
	phone: z
		.string()
		.min(10, { message: 'Phone is required' })
		.refine(value => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value), 'Invalid phone number'),
	email: z.string().min(1, { message: 'Email is required' }).email({
		message: 'Must be a valid email'
	}),
	street: z.string().min(1, { message: 'Street is required' }),
	zip: z.number().min(4, { message: 'Postal code is required' }), //,.pattern(/^\d{5}-\d{3}$/)
	city: z.string().min(1, { message: 'Position is required' }),
	github: z.string().optional(),
	linkedIn: z.string().optional(),
	homepage: z.string().url().optional().or(z.literal('')) //z.optional(z.string().trim().url({ message: 'Invalid URL' }))
})

export const profileSchema = z.object({
	position: z.string().min(1, { message: 'Position is required' }),
	profile: z.string().optional()
})
/* ,
	image: z.object({
		url: z.string().url().or(z.literal('')).optional(),
		public_id: z.string().optional()
	}) */
export const educationSchema = z.object({
	education: z.array(
		z.object({
			start: z.string(), //z.coerce.date(),
			end: z.string(), //z.coerce.date().optional(),
			present: z.boolean().optional(),
			school: z.string().min(1, { message: 'School is required' }),
			subject: z.string().min(1, { message: 'Subject is required' }),
			degree: z.string().min(1, { message: 'Degree is required' })
		})
	)
})

export const workSchema = z.object({
	work: z.array(
		z.object({
			start: z.string(),
			end: z.string().optional(),
			company: z.string().min(1, { message: 'Company is required' }),
			position: z.string().min(1, { message: 'Position is required' }),
			description: z.string().min(1, { message: 'Description is required' }).optional()
		})
	)
})

export const languagesSchema = z.object({
	languages: z.array(
		z.object({
			language: z.string().min(4, { message: 'Language is required' }),
			level: z.string().min(2, { message: 'Level is required' }).optional()
		})
	)
})

export const hardskillsSchema = z.object({
	hardskills: z.array(
		z.object({
			skill: z.string().optional()
		})
	)
})

export const softskillsSchema = z.object({
	softskills: z.array(
		z.object({
			skill: z.string().optional()
		})
	)
})
