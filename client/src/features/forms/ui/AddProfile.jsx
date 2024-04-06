import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useUpdateCVMutation, useUploadImageMutation, selectImage } from 'shared/api'
import { Button, Field, Text } from 'shared/ui'
import UploadImage from 'entities/image/ui/UploadImage'
import styles from 'features/forms/ui/form.module.css'

export const AddProfile = ({ id, position, profile, data }) => {
	const navigate = useNavigate()

	const [updateCV] = useUpdateCVMutation()
	const img = useSelector(selectImage)
	console.log(img)

	const [uploadImage, { isLoading, isError, error }] = useUploadImageMutation()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setValue
	} = useForm({
		defaultValues: {
			position,
			profile
		}
	})
	useEffect(() => {
		reset({ position, profile })
	}, [data])

	const onNext = async data => {
		data.image = img
		//setValue('image', img)
		try {
			console.log(id)
			await updateCV({ id, data })
			navigate(`/info/${id}`)
		} catch (err) {
			return err
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onNext)}>
			<fieldset className={styles.fieldset}>
				<legend className={styles.legend}>Position and short Profile</legend>
				<Field
					name='position'
					type='text'
					label='Position'
					errors={errors?.position}
					register={register}
					rules={{
						required: 'Position is required'
					}}
				/>
				<UploadImage />
				{/* <Field
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
				/> */}
				<Text
					name='profile'
					type='text'
					label='Profile'
					errors={errors?.profile}
					register={register}
				/>
			</fieldset>
			<div className={styles.submitWrapper}>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Loading' : 'Next'}
				</Button>
			</div>
		</form>
	)
}
