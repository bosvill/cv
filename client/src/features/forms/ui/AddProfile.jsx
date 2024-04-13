import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	useGetCVQuery,
	useUpdateCVMutation,
	useUploadImageMutation,
	useDeleteImageMutation
} from 'shared/api'
import { Button, Field, IconButton, Text, Icon } from 'shared/ui'
import styles from 'features/forms/ui/form.module.css'
import { profileSchema, imageSchema } from '../model/formsSchema'

export const AddProfile = ({ id }) => {
	const navigate = useNavigate()
	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const { position, profile, image } = data?.cv || {}
	const [uploadImage, { isLoading: isUploading, isError: isUploadError, error: uploadError }] =
		useUploadImageMutation()
	const [deleteImage, { error: delError, isError: isDelError }] = useDeleteImageMutation()
	const [updateCV] = useUpdateCVMutation()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setValue
	} = useForm({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			position,
			profile,
			image
		}
	})

	useEffect(() => {
		reset({ position, profile, image })
	}, [position, profile, image, reset])

	const onNext = async data => {
		try {
			console.log('Profile data: ', data)
			await updateCV({ id, data })
			navigate(`/info/${id}`)
		} catch (err) {
			return err
		}
	}

	const handleChange = async event => {
		try {
			const formData = new FormData()
			formData.append('image', event.target.files[0])
			await uploadImage({ id, image: formData }).unwrap()
		} catch (err) {
			return err
		}
	}

	const onImgDelete = async () => {
		try {
			const res = await deleteImage({ id, public_id: image.public_id }).unwrap()
			console.log(res)
			setValue('image.url', '')
			setValue('image.public_id', '')
			if (isDelError) {
				throw new Error(delError.data.message)
			}
		} catch (err) {
			return err
		}
	}

	return (
		<>
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			{isLoading || (isFetching && <p>Loading...</p>)}
			<form className={styles.form} onSubmit={handleSubmit(onNext)}>
				<fieldset className={styles.imgFieldset}>
					<legend className={styles.legend}>Profile Image</legend>
					<div className={styles.imgItem}>
						<label htmlFor='imgUrl' className={styles.imgLabel}>
							{!image ? (
								<Icon id='person' className={styles.person} />
							) : (
								<img src={`${image?.url}`} alt='User image' className={styles.img} />
							)}
							<input
								id='imgUrl'
								type='file'
								name='image'
								accept='image/png, image/jpeg, image/jpg, image/webp'
								{...register('image')}
								onChange={handleChange}
								style={{ display: 'none' }}
							/>
							{image?.url?.length < 0 ? <p>Change Image</p> : <p>Upload image</p>}
							{isUploading && <p className={styles.loading}>Loading...</p>}
							{(isUploadError || errors?.image || isDelError) && (
								<p className={styles.error}>
									{uploadError?.data?.message || errors?.image?.message || delError?.data?.message}
								</p>
							)}
						</label>

						{image?.url?.length > 0 ? (
							<div className={styles.trashImg}>
								<IconButton type='button'>
									<Icon id='trash' className={styles.svg} onClick={onImgDelete} />
								</IconButton>
							</div>
						) : null}
					</div>
				</fieldset>
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}>Position and short Profile</legend>
					<Field
						name='position'
						type='text'
						label='Position'
						error={errors?.position}
						register={register}
					/>
					{/* <UploadImage /> */}

					<Text
						name='profile'
						type='text'
						label='Profile'
						error={errors?.profile}
						register={register}
					/>
				</fieldset>
				<div className={styles.submitWrapper}>
					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Loading' : 'Next'}
					</Button>
				</div>
			</form>
		</>
	)
}
