import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useUpdateCVMutation, useGetCVQuery } from 'shared/api'
import { Button, IconButton, Icon, Field } from 'shared/ui'
import styles from 'features/forms/ui/form.module.css'
import { educationSchema } from '../model/formsSchema'

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

	const { fields, append, remove} = useFieldArray({
		control,
		name: 'education'
	})

	const onNext = async data => {
		console.log('submitting Education data: ', data)
		await updateCV({ id, data })
		navigate(`/work/${id}`)
	}

	const onAppend = () => {
		setActiveIndex(fields.length)
		append(/* {
			start: '',
			end: '',
			present: false,
			school: '',
			subject: '',
			degree: ''
		} */)
	}

	return (
		<>
			{(isLoading || isFetching) && <p>Loading...</p>}
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onNext)} className={styles.form}>
				<div className={styles.fieldArray}>
					{fields.map((field, index) =>
						index === activeIndex ? (
							<fieldset className={styles.fieldset} key={field.id}>
								<article className={styles.item}>
									<div className={styles.downBtn}>
										<IconButton onClick={() => setActiveIndex()}>
											<Icon id='chevronUp' className={styles.svg} />
										</IconButton>
									</div>
									<div className={styles.dateItem}>
										<Field
											autoFocus
											id='startDate'
											name={`education.${index}.start`}
											type='date'
											error={errors?.education?.[index]?.start}
											label='Start date'
											register={register}
										/>
										<Field
											id='endDate'
											type='date'
											name={`education.${index}.end`}
											label='End date'
											error={errors?.education?.[index]?.end}
											disabled={watch(`education.${index}.present`) === true}
											register={register}
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
									/>
									<Field
										id='sbj'
										name={`education.${index}.subject`}
										label='Subject'
										error={errors?.education?.[index]?.subject}
										register={register}
									/>
									<Field
										id='dgr'
										name={`education.${index}.degree`}
										label='Degree'
										error={errors?.education?.[index]?.degree}
										register={register}
									/>
								</article>
								<div className={styles.trash}>
									<IconButton onClick={() => remove(index)}>
										<Icon id='trash' className={styles.svg} />
									</IconButton>
								</div>
							</fieldset>
						) : (
							<div className={styles.fieldset} key={field?._id}>
								<article className={styles.collapsed}>
									<p>
										{fields?.[index]?.degree} at {fields?.[index]?.school}
									</p>
									<IconButton onClick={() => setActiveIndex(index)}>
										<Icon id='chevronDown' className={styles.svg} />
									</IconButton>
								</article>
							</div>
						)
					)}

					<Button onClick={onAppend}>Add</Button>

					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting ? 'Loading' : 'Next'}
					</Button>
				</div>
			</form>
		</>
	)
}
