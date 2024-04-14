import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetCVQuery, useUpdateCVMutation } from 'shared/api'
import { Button, IconButton, Icon, Field } from 'shared/ui'
import { hardskillsSchema } from '../model/formsSchema'
import styles from 'features/forms/ui/form.module.css'

export const AddHardskills = () => {
	const { id } = useParams()
	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const [updateCV] = useUpdateCVMutation()
	const navigate = useNavigate()

	const hardskills = data?.cv?.hardskills || []
	
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control
	} = useForm({
		resolver: zodResolver(hardskillsSchema),
		defaultValues: { hardskills: [...hardskills] }
	})

	const { fields, append,  remove } = useFieldArray({
		control,
		name: 'hardskills'
	})

	const onSubmit = async data => {
		try {
			await updateCV({ id, data })
			navigate(`/softskills/${id}`)
		} catch (err) {
			return err
		}
	}

	const onAppend = () => {
		append({ skill: '' })
	}
	return (
		<div>
			<h1 className={styles.title}>Hard Skills</h1>
			{(isLoading || isFetching) && <p>Loading...</p>}
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.fieldArray}>
					{fields.map((field, index) => (
						<fieldset className={styles.fieldset} key={field.id}>
							<article className={styles.skillItem}>
								<Field
									id='hard'
									name={`hardskills.${index}.skill`}
									defaultValue={hardskills?.[index]?.skill}
									error={errors?.hardskills}
									register={register}
								/>
								<IconButton type='button' onClick={() => remove(index)}>
									<Icon className={styles.svg} id='trash' />
								</IconButton>
							</article>
						</fieldset>
					))}

					<Button onClick={onAppend}>Add</Button>
					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Loading' : 'Next'}
					</Button>
				</div>
			</form>
		</div>
	)
}
