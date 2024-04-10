import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().min(1, { message: 'Email is required' }).email({
		message: 'Must be a valid email'
	}),
	password: z.string().min(6, { message: 'Password must be at least 8 characters' })
})

export const registerSchema = z
	.object({
		email: z.string().min(1, { message: 'Email is required' }).email({
			message: 'Must be a valid email'
		}),
		password: z.string().min(6, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z.string().min(6, { message: 'Confirm password is required' })
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Passwords don't match"
	})