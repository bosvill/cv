import { useForm } from 'react-hook-form'
import { useUploadImageMutation } from 'shared/api'
import { Field } from 'shared/ui'

const UploadImage = () => {
	const [uploadImage, { isLoading, isError, error }] = useUploadImageMutation()
	const {formState: { errors, isSubmitting }} = useForm()
	return (
		<Field
			id='image'
			name='image'
			type='file'
			label='Profile image'
			accept='image/png, image/jpeg, image/jpg, image/webp'
			errors={errors?.image}
			onChange={event => {
				const formData = new FormData()
				formData.append('image', event.target.files[0])
				console.log(formData)
				uploadImage(formData).unwrap()
				//dispatch(setImage(result))
			}}
		/>
	)
}

export default UploadImage
