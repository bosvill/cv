import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser, useGetCVQuery } from 'shared/api'
import { useCreateCVMutation, useGetAllQuery } from 'shared/api'
import { setCV } from 'shared/api/cv/cvSlice'
import { Button, Radio, Text, Field } from 'shared/ui'
import styles from 'features/forms/ui/form.module.css'

export const CV = () => {
	const id=useSelector(selectUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const [createCV, { status }] = useCreateCVMutation()
const { data, isLoading, isSuccess, isError, error } = useGetCVQuery(id)
const { template } = data?.cv || ''
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues:{template}
	})

	const onNext = async data => {
		try {
			const result = await createCV({ user, ...data })
			const id = result.data.cv._id
			/* if (status === 'fulfilled') {
				console.log('fulfilled')
				dispatch(setCV(id))
			} */
			navigate(`/profile/${id}`)
		} catch (err) {
			return err
		}
	}

	

	return (
		<div>
			<form onSubmit={handleSubmit(onNext)}>
				<fieldset className={styles.fieldset}>
					<legend>Choose template</legend>
					<Radio name='template' label='Green' value='green' register={register} />
					<Radio name='template' label='React' value='react' register={register} />
				</fieldset>
				
				<Button type='submit'>New CV</Button>
			</form>
		</div>
	)
}
