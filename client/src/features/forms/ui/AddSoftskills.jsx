
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCVMutation, useGetCVQuery } from 'shared/api'
import { Button, IconButton, Icon, Field } from 'shared/ui'
import styles from 'features/forms/ui/form.module.css'
import { softskillsSchema } from '../model/formsSchema'

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
	} = useForm({
		resolver: zodResolver(softskillsSchema),
		defaultValues: { softskills: [...softskills] }
	})

	const { fields, append,  remove } = useFieldArray({
		control,
		name: 'softskills'
	})

	const onNext = async data => {
		try {
			console.log('Add soft Data: ', data)
			await updateCV({ id, data })
			navigate(`/preview/${id}`)
		} catch (err) {
			return err
		}
	}

	const onAppend=()=>{
		append({skill:''})
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
									id='soft'
									autoFocus
									className={styles.input}
									name={`softskills.${index}.skill`}
									type='text'
									errors={errors?.softskills}
									register={register}
								/>
								<IconButton type='button' onClick={() => remove(index)}>
									<Icon className={styles.svg} id='trash' />
								</IconButton>
							</article>
						</fieldset>
					))}
					<button type='button' onClick={onAppend} className={styles.plusBtn}>
						<span>
							<Icon id='plus' className={styles.plus} />
						</span>
						<span>Add Skill</span>
					</button>
					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Loading' : 'Next'}
					</Button>
				</div>
			</form>
		</div>
	)
}
