import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import {
	useUploadImageMutation,
	useUpdateCVMutation,
	useGetCVQuery,
	selectImage
} from 'src/shared/api'
import { Button, Field } from 'src/shared/ui'
import styles from 'src/features/forms/ui/form.module.css'
import { infoSchema } from '../model/formsSchema'

export const AddInfo = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading, isSuccess, isError, error } = useGetCVQuery(id)

	const { firstName, lastName, phone, email, street, zip, city, github, linkedIn, homepage } = data?.cv || {}

	const [updateCV, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
		useUpdateCVMutation()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm({
		resolver: zodResolver(infoSchema),
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
	}, [reset, isSuccess])

	const onNext = async data => {
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
			{isError || (isUpdateError && <p className={styles.error}>{error.data?.message}</p>)}
			{(isLoading || isUpdating) && <p>Loading...</p>}
			<form className={styles.form} onSubmit={handleSubmit(onNext)}>
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Full name</legend>
					<div className={styles.nameItem}>
						<Field
							autoFocus
							id='firstName'
							name='firstName'
							label='First Name'
							error={errors?.firstName}
							register={register}
						/>
						<Field
							id='lastName'
							name='lastName'
							label='Last Name'
							error={errors?.lastName}
							register={register}
						/>
					</div>
				</fieldset>

				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Address</legend>
					<Field
						id='street'
						name='street'
						label='Street'
						error={errors?.street}
						register={register}
					/>
					<div className={styles.fitem70}>
						<Field
							id='zip'
							name='zip'
							type='number'
							label='Postal code'
							error={errors?.zip}
							register={register}
						/>
						<Field id='city' name='city' label='City' error={errors?.city} register={register} />
					</div>
				</fieldset>

				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Contact and Links</legend>
					<div className={styles.contactItem}>
						<Field
							id='email'
							name='email'
							label='Email'
							error={errors?.email}
							register={register}
						/>
						<Field
							id='phone'
							name='phone'
							type='tel'
							label='Phone'
							error={errors?.phone}
							register={register}
						/>
						<Field
							id='linkedIn'
							name='linkedIn'
							label='LinkedIn'
							error={errors?.linkedIn}
							register={register}
						/>
						<Field
							id='github'
							name='github'
							label='Github'
							error={errors?.github}
							register={register}
						/>
						<Field
							id='homepage'
							name='homepage'
							type='url'
							label='Homepage'
							error={errors?.homepage}
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
