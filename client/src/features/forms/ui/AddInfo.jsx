import { useEffect } from 'react'
import { useMatches, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { useUpdateCVMutation, useGetCVQuery, selectEmail } from 'shared/api'
import { Button, Field } from 'shared/ui'
import { infoSchema } from '../model/formsSchema'
import styles from 'src/features/forms/ui/form.module.css'

export const AddInfo = () => {
	const { id } = useParams()
	const matches=useMatches()
	const mail = useSelector(selectEmail)
	const { data, isLoading, isSuccess, isError, error } = useGetCVQuery(id)
	const [updateCV, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
		useUpdateCVMutation()
	const navigate = useNavigate()

	const { firstName, lastName, phone, email, street, zip, city, github, linkedIn, homepage } =
		data?.cv || {}
console.log(matches)
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
			email: !email ? mail : email,
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

	const onSubmit = async data => {
		try {
			await updateCV({ id, data })
			navigate(`/cv/${id}/education`)
		} catch (err) {
			return err
		}
	}

	return (
		<section className={styles.section}>
			{(isError || isUpdateError) && <p className={styles.error}>{error.data?.message}</p>}
			{(isLoading || isUpdating) && <p>Loading...</p>}
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Full name</legend>
					<div className={styles.nameItem}>
						<Field
							autoFocus
							id='fname'
							name='firstName'
							label='First Name'
							error={errors?.firstName}
							register={register}
						/>
						<Field
							id='lName'
							name='lastName'
							label='Last Name'
							error={errors?.lastName}
							register={register}
						/>
					</div>
				</fieldset>

				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Address</legend>
					<div className={styles.contactItem}>
						<div className={styles.street}>
							<Field
								id='str'
								name='street'
								label='Street'
								error={errors?.street}
								register={register}
							/>
						</div>
						<Field
							id='z'
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
						<Field id='mail' name='email' label='Email' error={errors?.email} register={register} />
						<Field
							id='tel'
							name='phone'
							type='tel'
							label='Phone'
							error={errors?.phone}
							register={register}
						/>
						<Field
							id='linked'
							name='linkedIn'
							label='LinkedIn'
							error={errors?.linkedIn}
							register={register}
						/>
						<Field
							id='git'
							name='github'
							label='Github'
							error={errors?.github}
							register={register}
						/>
						<Field
							id='page'
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
