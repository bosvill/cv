import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useCreateCVMutation, selectUser } from 'shared/api'
import { Button, Radio } from 'shared/ui'
import styles from './form.module.css'

export const CreateCV = () => {
	const user = useSelector(selectUser)
	const [createCV, { isError, error, isLoading }] = useCreateCVMutation()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm({
		defaultValues: { template }
	})

	const onSubmit = async data => {
		try {
			const result = await createCV({ user, ...data }).unwrap()
			console.log(result)
			const id = result.data.cv._id

			navigate(`/profile/${id}`)
		} catch (err) {
			return err
		}
	}

	return (
		<div>
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			{isLoading && <p>Loading...</p>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset className={styles.fieldset}>
					<legend>Choose template</legend>
					<Radio name='template' label='Green' value='green' register={register} />
					<Radio name='template' label='React' value='react' register={register} />
				</fieldset>

				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Loading' : 'Create'}
				</Button>
			</form>
		</div>
	)
}
