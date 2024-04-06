import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { useUpdateCVMutation } from 'shared/api'
import { Button, IconButton, Icon, Field, Text } from 'shared/ui'
import styles from 'features/forms/ui/form.module.css'

export const AddWork = ({ id, work, data }) => {
	const navigate = useNavigate()
	const [updateCV] = useUpdateCVMutation()

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({ defaultValues: { ...work } })

	const { fields, append, remove, update } = useFieldArray({ control, name: 'work' })

	useEffect(() => {
		work?.forEach((field, index) => {
			Object.keys(field).forEach(key => update(index, field[key]))
		})
	}, [work, update])

	const onNext = async data => {
		try {
			console.log('Add work Data: ', data)
			await updateCV({ id, data })
			navigate(`/languages/${id}`)
		} catch (err) {
			return err
		}
	}

	return (
		<form onSubmit={handleSubmit(onNext)}>
			<div className={styles.fieldArray}>
				{fields.map((field, index) => (
					<fieldset className={styles.fieldset} key={field?.id}>
						<article className={styles.item}>
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
									disabled={watch('present')}
									defaultValue={work?.[index]?.end}
									register={register}
								/>
								<div className={` ${styles.check}`}>
									<input
										type='checkbox'
										name='present'
										defaultValue={work?.[index]?.present}
									/>
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
							<IconButton type='button' onClick={() => remove(index)}>
								<Icon className={styles.svg} id='trash' />
							</IconButton>
						</div>
					</fieldset>
				))}
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
