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
	} = useForm({ mode: 'onChange' }) //, resolver: zodResolver(imageSchema)
	const handleImageChange = async event => {
		try {
			const formData = new FormData()
			formData.append('image', event.target.files[0])
			console.log(formData)
			await uploadImage(formData).unwrap()
		} catch (err) {
			return err
		}
	}
	console.log(errors)
	return (
		<div>
			{isSubmitting||isLoading ? <p>Uploading image..</p> : null}
			<Field
				id='image'
				type='file'
				name='image'
				label='Profile image'
				error={errors?.img || error?.data}
				register={register}
				onChange={handleImageChange}
			/>
			<button type='button' onClick={() => console.log('Invalid: ', errors)}>
				check invalid
			</button>
		</div>
	)
}

export default UploadImage
