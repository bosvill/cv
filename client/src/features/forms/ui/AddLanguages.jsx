import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCVMutation, useGetCVQuery } from 'shared/api'
import { Button, IconButton, Field, Select, Icon } from 'shared/ui'
import { levels } from 'shared/consts'
import styles from 'features/forms/ui/form.module.css'
import { languagesSchema } from '../model/formsSchema'

export const AddLanguages = () => {
	const { id } = useParams()
	const [activeIndex, setActiveIndex] = useState()
	const navigate = useNavigate()
	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const [updateCV] = useUpdateCVMutation()

	const languages = data?.cv?.languages || {}

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control
	} = useForm({
		resolver: zodResolver(languagesSchema),
		defaultValues: { languages: [...languages] }
	})
	console.log(errors)
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'languages'
	})

	const onNext = async data => {
		try {
			console.log('Add lang Data: ', data)
			await updateCV({ id, data })
			navigate(`/hardskills/${id}`)
		} catch (err) {
			return err
		}
	}

	const onAppend = () => {
		setActiveIndex(fields.length)
		append({ language: '', level: '' })
	}
	return (
		<div>
			<h1 className={styles.title}>Languages</h1>
			{(isLoading || isFetching) && <p>Loading...</p>}
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onNext)}>
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
									<div className={styles.languageItem}>
										<Field
											autoFocus
											id='lang'
											className={styles.input}
											name={`languages.${index}.language`}
											label='Language'
											error={errors?.languages?.[index]?.language}
											register={register}
										/>
										<Select
											name={`languages.${index}.level`}
											id='lev'
											label='Level'
											options={levels}
											error={errors?.languages?.[index]?.level}
											register={register}
										/>
									</div>
								</article>
								<div className={styles.trash}>
									<IconButton onClick={() => remove(index)}>
										<Icon className={styles.svg} id='trash' />
									</IconButton>
								</div>
							</fieldset>
						) : (
							<div className={styles.fieldset} key={field._id}>
								<article className={styles.collapsed}>
									<p>
										{fields?.[index]?.language} {fields?.[index]?.level}
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
		</div>
	)
}
