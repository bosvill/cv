import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCVMutation, useGetCVQuery } from 'shared/api'
import { Button, IconButton, Field, Select, Icon } from 'shared/ui'
import { levels } from 'shared/consts'
import { languagesSchema } from '../model/formsSchema'
import styles from 'features/forms/ui/form.module.css'

export const AddLanguages = () => {
	const [activeIndex, setActiveIndex] = useState()
	const { id } = useParams()
	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const [updateCV] = useUpdateCVMutation()
	const navigate = useNavigate()

	const languages = data?.cv?.languages || []

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control
	} = useForm({
		resolver: zodResolver(languagesSchema),
		defaultValues: { languages: [...languages] }
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'languages'
	})

	const onSubmit = async data => {
		try {
			await updateCV({ id, data })
			navigate(`/cv/${id}/preview`)
		} catch (err) {
			return err
		}
	}

	const onAppend = () => {
		setActiveIndex(fields.length)
		append({ language: '', level: '' })
	}
	return (
		<>
			<h1 className={styles.title}>Languages</h1>
			{(isLoading || isFetching) && <p>Loading...</p>}
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.fieldArray}>
					{fields.map((field, index) => (
						<fieldset className={styles.fieldset} key={field.id}>
							{index === activeIndex ? (
								<article className={styles.item}>
									<div className={styles.languageItem}>
										<Field
											autoFocus
											id='lang'
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
							) : (
								<article className={styles.collapsed} key={field._id}>
									<p>
										{fields?.[index]?.language} {fields?.[index]?.level}
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
