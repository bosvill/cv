import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUpdateCVMutation } from 'shared/api'
import { Button, IconButton, Icon, Field } from 'shared/ui'
import styles from 'features/forms/ui/form.module.css'

export const AddEducation = ({ id, education, data }) => {
	const [isCollapsed, setIsCollapsed] = useState(true)
	const navigate = useNavigate()
	const [updateCV] = useUpdateCVMutation()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
		watch
	} = useForm({ defaultValues: { ...education } })

	const { fields, append, remove, swap, move, insert, update } = useFieldArray({
		control,
		name: 'education'
	})
	console.log(fields)
	useEffect(() => {
		education?.forEach((field, index) => {
			console.log(field, index)
			Object.keys(field).forEach(key => update(index, field[key]))
		})
	}, [education, update])

	const onNext = async data => {
		console.log('Education data: ', data)
		await updateCV({ id, data })
		navigate(`/work/${id}`)
	}


	return (
		<form onSubmit={handleSubmit(onNext)} className={styles.form}>
			<div className={styles.fieldArray}>
				{fields.map((field, index) =>
					isCollapsed ? (
						<div className={styles.fieldset}>
							<article className={styles.collapsed}>
								<p>
									{education?.[index]?.degree} at {education?.[index]?.school}
								</p>
								<IconButton type='button' onClick={() => setIsCollapsed(false)}>
									<Icon id='chevronDown' className={styles.svg} />
								</IconButton>
							</article>
						</div>
					) : (
						<fieldset className={styles.fieldset} key={field.id}>
							<article className={styles.item}>
								<div className={styles.downBtn}>
									<IconButton type='button' onClick={() => setIsCollapsed(true)}>
										<Icon id='chevronUp' className={styles.svg} />
									</IconButton>
								</div>
								<div className={styles.dateItem}>
									<Field
										id='start'
										name={`education.${index}.start`}
										type='date'
										label='Start date'
										defaultValue={education?.[index]?.start}
										register={register}
									/>
									<Field
										id='end'
										type='date'
										name={`education.${index}.end`}
										label='End date'
										disabled={watch(`education.${index}.present`) === true}
										defaultValue={education?.[index]?.end}
										register={register}
									/>
									<div className={styles.check}>
										<input type='checkbox' {...register(`education.${index}.present`)} />
										<label htmlFor='present' className={styles.label}>
											Present
										</label>
									</div>
								</div>
								<Field
									id='school'
									name={`education.${index}.school`}
									type='text'
									label='School'
									defaultValue={education?.[index]?.school}
									register={register}
								/>
								<Field
									id='subject'
									name={`education.${index}.subject`}
									type='text'
									label='Subject'
									errors={errors?.subject}
									register={register}
									defaultValue={education?.[index]?.subject}
								/>
								<Field
									id='degree'
									name={`education.${index}.degree`}
									type='text'
									label='Degree'
									errors={errors?.degree}
									register={register}
									defaultValue={education?.[index]?.degree}
								/>
							</article>
							<div className={styles.trash}>
								<IconButton type='button' onClick={() => remove(index)}>
									<Icon id='trash' className={styles.svg} />
								</IconButton>
							</div>
						</fieldset>
					)
				)}

				<Button type='button' onClick={() => append()}>
					Add
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Loading' : 'Next'}
				</Button>
			</div>
		</form>
	)
}
