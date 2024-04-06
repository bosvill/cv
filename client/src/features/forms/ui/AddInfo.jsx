import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {
	useUploadImageMutation,
	useUpdateCVMutation,
	useGetCVQuery,
	selectImage
} from 'src/shared/api'
import { Button, Field } from 'src/shared/ui'
import styles from 'src/features/forms/ui/form.module.css'

export const AddInfo = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading, isSuccess, isError, error } = useGetCVQuery(id)

	const { firstName, lastName, phone, email, street, zip, city, github, linkedIn, homepage } =
		data?.cv || {}

	const img = useSelector(selectImage)

	const [uploadImage, { isLoading: isImageLoading, isError: isImageError, error: imageError }] =
		useUploadImageMutation()
	const [updateCV, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
		useUpdateCVMutation()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm({
		defaultValues: {
			firstName,
			lastName,
			phone,
			email,
			street,
			zip,
			city,
			github,
			linkedIn,
			homepage
		}
	})

	useEffect(() => {
		reset()
	}, [isSuccess])

	const onNext = async data => {
		/* data.image = img
		console.log(data) */
		try {
			await updateCV({ id, data })
			navigate(`/education/${id}`)
		} catch (err) {
			return err
		}
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Add personal information</h1>
			{isError ||
				isImageError ||
				(isUpdateError && <p className={styles.error}>{error.data?.message}</p>)}
			{(isLoading || isImageLoading || isUpdating) && <p>Loading...</p>}
			<form className={styles.form} onSubmit={handleSubmit(onNext)}>
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Full name</legend>
					<div className={styles.nameItem}>
						<Field
							autoFocus
							id='firstName'
							name='firstName'
							type='text'
							label='First Name'
							errors={errors?.firstName}
							register={register}
							rules={{
								required: 'First name is required'
							}}
						/>
						<Field
							id='lastName'
							name='lastName'
							type='text'
							label='Last Name'
							errors={errors?.lastName}
							register={register}
							rules={{
								required: 'Last name is required'
							}}
						/>
					</div>
				</fieldset>
				{/* <fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Profile Picture</legend>
					<Field
						id='image'
						name='image'
						type='file'
						label='Profile image'
						accept='image/png, image/jpeg, image/jpg, image/webp'
						errors={errors?.image}
						//register={register}
						onChange={event => {
							const formData = new FormData()
							formData.append('image', event.target.files[0])
							console.log(formData)
							uploadImage(formData).unwrap()
							//dispatch(setImage(result))
						}}
					/>
				</fieldset> */}
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Address</legend>
					<Field
						id='street'
						name='street'
						type='text'
						label='Street'
						errors={errors?.street}
						register={register}
						rules={{
							required: 'Street is required'
						}}
					/>
					<div className={styles.fitem70}>
						<Field
							id='zip'
							name='zip'
							type='text'
							label='Postal code'
							errors={errors?.zip}
							register={register}
							rules={{
								required: 'Postal code is required'
							}}
						/>
						<Field
							id='city'
							name='city'
							type='text'
							label='City'
							errors={errors?.city}
							register={register}
							rules={{
								required: 'City is required'
							}}
						/>
					</div>
				</fieldset>

				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Contact and Links</legend>
					<div className={styles.contactItem}>
						<Field
							id='email'
							name='email'
							type='email'
							label='Email'
							errors={errors?.email}
							register={register}
							rules={{
								required: 'Email is required'
							}}
						/>
						<Field
							id='phone'
							name='phone'
							type='tel'
							label='Phone'
							errors={errors?.phone}
							register={register}
							rules={{
								required: 'Phone is required'
							}}
						/>
						<Field
							id='linkedIn'
							name='linkedIn'
							type='text'
							label='LinkedIn'
							errors={errors?.linkedIn}
							register={register}
						/>
						<Field
							id='github'
							name='github'
							type='text'
							label='Github'
							errors={errors?.github}
							register={register}
							rules={{
								required: 'Github is required'
							}}
						/>
						<Field
							id='homepage'
							name='homepage'
							type='url'
							pattern='https://.*'
							label='Homepage'
							errors={errors?.homepage}
							register={register}
						/>
					</div>
				</fieldset>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Loading' : 'Next'}
				</Button>
			</form>
		</section>
	)
}

