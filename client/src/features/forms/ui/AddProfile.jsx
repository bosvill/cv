import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import {
	useUpdateCVMutation,
	useUploadImageMutation,
	useDeleteImageMutation,
	resetImage,
	selectImage
} from 'shared/api'
import { Button, Field, IconButton, Text, Icon } from 'shared/ui'
import UploadImage from 'entities/image/ui/UploadImage'
import styles from 'features/forms/ui/form.module.css'
import { profileSchema, imageSchema } from '../model/formsSchema'
import { AddImage } from './AddImage'

export const AddProfile = ({ id, position, profile, image }) => {
	//const [preview,setPreview]=useState()
	const navigate = useNavigate()
	
	const [updateCV] = useUpdateCVMutation()
	const img = useSelector(selectImage)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch
	} = useForm({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			position,
			profile
		}
	})
	useEffect(() => {
		reset({ position, profile })
	}, [position, profile, reset])


	const onNext = async data => {
		data.image = img
		//setValue('image', img)
		try {
			console.log('Profile data: ', data)
			await updateCV({ id, data })
			navigate(`/info/${id}`)
		} catch (err) {
			return err
		}
	}
	
	

	return (
		<form className={styles.form} onSubmit={handleSubmit(onNext)}>
			<AddImage image={image}id={id}/>
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
	)
}
