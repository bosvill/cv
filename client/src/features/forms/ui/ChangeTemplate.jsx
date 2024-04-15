import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCVQuery, useUpdateCVMutation } from 'shared/api'
import { Button, Radio } from 'shared/ui'
import styles from './form.module.css'

export const ChangeTemplate = () => {
	const { id } = useParams()
	const { data, isLoading, isFetching } = useGetCVQuery(id)
	const [updateCV, { isError, error }] = useUpdateCVMutation()
	const navigate = useNavigate()
	console.log(id)
	const { template } = data?.cv.template || {}
	const {
		register,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm({ defaultValues: { template } })

	const onSubmit = async data => {
		try {
			await updateCV({ id, data })
			navigate(`/cv/${id}/profile`)
		} catch (err) {
			return err
		}
	}

	return (
		<>
			<h1>Change Template</h1>
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			{(isLoading || isFetching) && <p>Loading...</p>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset className={styles.fieldset}>
					<legend>Choose template</legend>
					<Radio name='template' label='Green' value='green' register={register} />
					<Radio name='template' label='React' value='react' register={register} />
				</fieldset>

				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Loading' : 'Next'}
				</Button>
			</form>
		</>
	)
}
