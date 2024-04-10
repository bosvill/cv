import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCVMutation } from 'shared/api'
import { Button, IconButton, Icon, Field, Text } from 'shared/ui'
import styles from 'features/forms/ui/form.module.css'
import { workSchema } from '../model/formsSchema'

export const AddWork = ({ id, work }) => {
	const [activeIndex, setActiveIndex] = useState()
	const navigate = useNavigate()
	const [updateCV] = useUpdateCVMutation()

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({ defaultValues: { work: [...work] }, resolver: zodResolver(workSchema) })

	const { fields, append, remove } = useFieldArray({ control, name: 'work' })

	const onNext = async data => {
		try {
			console.log('Add work Data: ', data)
			await updateCV({ id, data })
			navigate(`/languages/${id}`)
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
		<form onSubmit={handleSubmit(onNext)}>
			<div className={styles.fieldArray}>
				{fields.map((field, index) =>
					index === activeIndex ? (
						<fieldset
							className={styles.fieldset}
							key={field?.id}
							isExpanded={activeIndex === index}>
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
									<div className={` ${styles.check}`}>
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
						<div className={styles.fieldset} key={field?.id}>
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
				<button type='button' onClick={onAppend} className={styles.plusBtn}>
					<span>
						<Icon id='plus' className={styles.plus} />
					</span>
					<span>Add</span>
				</button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Loading' : 'Next'}
				</Button>
			</div>
		</form>
	)
}
