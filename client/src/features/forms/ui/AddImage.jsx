import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateCVMutation, useUploadImageMutation, selectImage, resetImage, useDeleteImageMutation } from 'shared/api'
import { ImageField, Icon, IconButton } from 'shared/ui'
import { imageSchema } from '../model/formsSchema'
import styles from './form.module.css'

export const AddImage = ({ id, image }) => {
	const dispatch = useDispatch()
	const [uploadImage, { isLoading, isError, error }] = useUploadImageMutation()
	const [deleteImage, { error: imgError, isError: isImgError, isSuccess: imgSuccess }] =
		useDeleteImageMutation()
	//const img = image || useSelector(selectImage)
	//console.log('Image', img)
	//console.log(!img)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({ resolver:zodResolver(imageSchema) }) //, resolver: zodResolver(imageSchema)

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

	const handleChange = async event => {
		try {
			const formData = new FormData()
			formData.append('image', event.target.files[0])
			console.log(formData)
			const res = await uploadImage(formData).unwrap()
			console.log(res)
			dispatch(resetImage())
			//setValue('image', img)
			//return img
		} catch (err) {
			return err
		}
	}

	const onImgDelete = async () => {
		console.log(image.public_id)
		const res = await deleteImage(image.public_id).unwrap()
		console.log(res)
		/* try {
			await deleteImage(image.public_id).unwrap()
			if (isImgError) {
				throw new Error(imgError.data.message)
			}
		} catch (err) {
			return err
		} */
	}
	return (
		<>
			<fieldset className={styles.imgFieldset}>
				<legend className={styles.legend}>Profile Image</legend>

				{/* {!watch('image') || watch('image').length ===0  ?<Icon id='person' className={styles.person} />:<img src={`${image.url}`} alt='User profile image' className={styles.img} />} */}
				<div className={styles.imgItem}>
					<label htmlFor='profileImg' className={styles.imgLabel}>
						{image ? (
							<img src={`${image.url}`} alt='User profile image' className={styles.img} />
						) : (
							<Icon id='person' className={styles.person} />
						)}
						<input
							id='profileImg'
							type='file'
							name='image'
							{...register('image')}
							onChange={handleChange}
							style={{ display: 'none' }}
						/>
						{image ? <p>Change Image</p> : <p>Upload image</p>}
						{isLoading && <p className={styles.loading}>Loading...</p>}
						{(isError || errors?.image || isImgError) && (
							<p className={styles.error}>{error?.data?.message || errors?.image?.message || imgError?.data?.message}</p>
						)}
					</label>

					{image ? (
						<div className={styles.trashImg}>
							<button type='button'>
								<Icon id='trash' className={styles.svg} onClick={()=>dispatch(resetImage)} />
							</button>
						</div>
					) : null}
				</div>
			</fieldset>
		</>
	)
}
