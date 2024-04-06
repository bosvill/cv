import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useUpdateCVMutation, useGetCVQuery } from 'shared/api'
import { Button, IconButton, Icon, Field } from 'shared/ui'
import styles from 'features/forms/ui/form.module.css'

export const AddSoftskills = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const [updateCV] = useUpdateCVMutation()
	const softskills = data?.cv?.softskills || []
	console.log('softskills: ', softskills)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control
	} = useForm({ defaultValues: { ...softskills } })

	const { fields, append, update, remove, swap, move, insert } = useFieldArray({
		control,
		name: 'softskills'
	})

	useEffect(() => {
		softskills.forEach((field, index) => {
			Object.keys(field).forEach(key => update(index, field[key]))
		})
	}, [softskills, update])

	const onNext = async data => {
		try {
			console.log('Add soft Data: ', data)
			await updateCV({ id, data })
			navigate(`/preview/${id}`)
		} catch (err) {
			return err
		}
	}

	return (
		<div>
			<h1 className={styles.title}>Soft Skills</h1>
			{(isLoading || isFetching) && <p>Loading...</p>}
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onNext)}>
				<div className={styles.fieldArray}>
					{fields.map((field, index) => (
						<fieldset className={styles.fieldset} key={field.id}>
							<article className={styles.skillItem}>
								<Field
									autoFocus
									className={styles.input}
									name={`softskills.${index}.skill`}
									type='text'
									errors={errors?.softskills}
									defaultValue={softskills?.[index]?.skill}
									register={register}
								/>
								<IconButton type='button' onClick={() => remove(index)}>
									<Icon className={styles.svg} id='trash' />
								</IconButton>
							</article>
						</fieldset>
					))}
					<Button type='button' onClick={() => append()}>
						Add Skill
					</Button>
					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Loading' : 'Next'}
					</Button>
				</div>
			</form>
		</div>
	)
}
