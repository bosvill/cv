import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetCVQuery, useUpdateCVMutation } from 'shared/api'
import { Button, IconButton, Icon, Field, Text } from 'shared/ui'
import { workSchema } from '../model/formsSchema'
import styles from 'features/forms/ui/form.module.css'

export const AddWork = ({ id }) => {
	const [activeIndex, setActiveIndex] = useState()
	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const [updateCV] = useUpdateCVMutation()
	const navigate = useNavigate()

	const { work } = data?.cv || []

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({ defaultValues: { work: [...work] }, resolver: zodResolver(workSchema) })

	const { fields, append, remove } = useFieldArray({ control, name: 'work' })


	const onSubmit = async data => {
		try {
			await updateCV({ id, data })
			navigate(`/cv/${id}/hardskills`)
		} catch (err) {
			return err
		}
	}

	const onAppend = () => {
		setActiveIndex(fields.length)
		append({
			start: '',
			end: '',
			present: false,
			company: '',
			position: '',
			description: ''
		})
	}

	return (
		<>
			{(isLoading || isFetching) && <p>Loading...</p>}
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.fieldArray}>
					{fields.map((field, index) =>
						index === activeIndex ? (
							<fieldset key={field?.id} className={styles.fieldset}>
								<article className={styles.item}>
									<div className={styles.downBtn}>
										<IconButton onClick={() => setActiveIndex()}>
											<Icon id='chevronUp' className={styles.svg} />
										</IconButton>
									</div>
									<div className={styles.dateItem}>
										<Field
											name={`work.${index}.start`}
											type='date'
											label='Start date'
											defaultValue={work?.[index]?.start}
											register={register}
										/>
										<Field
											type='date'
											name={`work.${index}.end`}
											label='End date'
											disabled={watch(`work.${index}.present`) === true}
											register={register}
											defaultValue={work?.[index]?.end}
										/>
										<div className={styles.check}>
											<input type='checkbox' {...register(`work.${index}.present`)} />
											<label htmlFor='present' className={styles.label}>
												Present
											</label>
										</div>
									</div>
									<Field
										name={`work.${index}.company`}
										type='text'
										label='Company'
										errors={errors?.company}
										register={register}
										rules={{
											required: 'Company is required'
										}}
										defaultValue={work?.[index]?.company}
									/>
									<Field
										name={`work.${index}.position`}
										type='text'
										label='Position'
										errors={errors?.position}
										register={register}
										rules={{
											required: 'Position is required'
										}}
										defaultValue={work?.[index]?.position}
									/>
									<Text
										name={`work.${index}.description`}
										type='text'
										label='Description'
										errors={errors?.description}
										register={register}
										rules={{
											required: 'Description is required'
										}}
										defaultValue={work?.[index]?.description}
									/>
								</article>
								<div className={styles.trash}>
									<IconButton onClick={() => remove(index)}>
										<Icon className={styles.svg} id='trash' />
									</IconButton>
								</div>
							</fieldset>
						) : (
							<div className={styles.fieldset} key={field?._id}>
								<article className={styles.collapsed}>
									<p>
										{fields?.[index]?.position} at {fields?.[index]?.company}
									</p>
									<IconButton onClick={() => setActiveIndex(index)}>
										<Icon id='chevronDown' className={styles.svg} />
									</IconButton>
								</article>
							</div>
						)
					)}
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
