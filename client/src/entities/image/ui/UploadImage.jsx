import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUploadImageMutation } from 'shared/api'
import { Field } from 'shared/ui'
import { imageSchema } from '../model/imageSchema'

const UploadImage = () => {
	const [uploadImage, { isLoading, isError, error }] = useUploadImageMutation()
	const {
		register,
		formState: { errors, isSubmitting }
	} = useForm({ resolver: zodResolver(imageSchema) })
	return (
		<Field
			id='image'
			name='image'
			type='file'
			label='Profile image'
			error={errors?.image}
			register={register}
			onChange={event => {
				const formData = new FormData()
				formData.append('image', event.target.files[0])
				console.log(formData)
				uploadImage(formData).unwrap()
			}}
		/>
	)
}

export default UploadImage
