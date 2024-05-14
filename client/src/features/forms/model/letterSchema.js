import { z } from 'zod'

export const letterSchema=z.object({
  hrLast: z.string().min(1, { message: 'HR name is required' }),
  refNumber: z.string().optional(),
  companyName:z.string().min(1,{message:'Company name is required'}),
  companyStreet: z.string().min(1, { message: 'Company street is required' }),
	companyZip: z.number().min(4, { message: 'Company postal code is required' }),
	companyCity: z.string().min(1, { message: 'City is required' }),
  content:z.string()
})
