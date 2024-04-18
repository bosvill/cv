import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCVMutation, useGetCVQuery } from 'shared/api'
import { Button, IconButton, Icon, Field } from 'shared/ui'
import { educationSchema } from '../model/formsSchema'
import styles from 'features/forms/ui/form.module.css'

export const AddEducation = ({ id }) => {
	const [activeIndex, setActiveIndex] = useState()
	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const navigate = useNavigate()
	const [updateCV] = useUpdateCVMutation()

	const { education } = data?.cv || {}

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
		watch
	} = useForm({
		resolver: zodResolver(educationSchema),
		defaultValues: { education: [...education] }
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'education'
	})

	const onSubmit = async data => {
		console.log(data)
		await updateCV({ id, data })
		navigate(`/cv/${id}/work`)
	}

	const onAppend = () => {
		setActiveIndex(fields.length)
		append({
			start: '',
			end: '',
			present: false,
			school: '',
			subject: '',
			degree: ''
		})
	}

	return (
		<>
			{(isLoading || isFetching) && <p>Loading...</p>}
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.fieldArray}>
					{fields.map((field, index) => (
						<fieldset className={styles.fieldset} key={field.id}>
							{index === activeIndex ? (
								<article className={styles.item}>
									<div className={styles.dateItem}>
										<Field
											autoFocus
											id='startDate'
											type='date'
											name={`education.${index}.start`}
											label='Start date'
											error={errors?.education?.[index]?.start}
											register={register}
											/* defaultValue={education?.[index]?.start} */
										/>
										<Field
											id='endDate'
											type='date'
											name={`education.${index}.end`}
											label='End date'
											error={errors?.education?.[index]?.end}
											register={register}
											disabled={watch(`education.${index}.present`) === true}
											/* defaultValue={education?.[index]?.end} */
										/>
										<div className={styles.check}>
											<input id='now' type='checkbox' {...register(`education.${index}.present`)} />
											<label htmlFor='now' className={styles.label}>
												Present
											</label>
										</div>
									</div>
									<Field
										id='sch'
										name={`education.${index}.school`}
										label='School'
										error={errors?.education?.[index]?.school}
										register={register}
										defaultValue={education?.[index]?.school}
									/>
									<Field
										id='sbj'
										name={`education.${index}.subject`}
										label='Subject'
										error={errors?.education?.[index]?.subject}
										register={register}
										/* defaultValue={education?.[index]?.subject} */
									/>
									<Field
										id='dgr'
										name={`education.${index}.degree`}
										label='Degree'
										error={errors?.education?.[index]?.degree}
										register={register}
										defaultValue={education?.[index]?.degree}
									/>
								</article>
							) : (
								<article className={styles.collapsed} key={field?._id}>
									<p>
										{fields?.[index]?.degree} at {fields?.[index]?.school}
									</p>
								</article>
							)}
							<div className={styles.btnItem}>
								{index === activeIndex ? (
									<IconButton onClick={() => setActiveIndex()}>
										<Icon className={styles.svg} id='chevronUp' title='Close' />
									</IconButton>
								) : (
									<IconButton onClick={() => setActiveIndex(index)}>
										<Icon className={styles.svg} id='chevronDown' title='Show' />
									</IconButton>
								)}

								<IconButton onClick={() => remove(index)}>
									<Icon className={styles.svg} id='trash' title='Delete' />
								</IconButton>
							</div>
						</fieldset>
					))}

					<Button type='button' onClick={onAppend}>
						Add
					</Button>

					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Loading' : 'Next'}
					</Button>
				</div>
			</form>
		</>
	)
}
