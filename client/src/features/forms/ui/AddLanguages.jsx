import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useUpdateCVMutation, useGetCVQuery } from 'shared/api'
import { Button, IconButton, Field, Select, Icon } from 'shared/ui'
import { levels } from 'shared/consts'
import styles from 'features/forms/ui/form.module.css'

export const AddLanguages = () => {
	const { id } = useParams()

	const navigate = useNavigate()
	const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
	const [updateCV] = useUpdateCVMutation()
	const languages = data?.cv?.languages || []
	console.log('languages: ', languages)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control
	} = useForm({ defaultValues: { ...languages } })

	const { fields, append, update, remove, swap, move, insert } = useFieldArray({
		control,
		name: 'languages'
	})

	useEffect(() => {
		languages.forEach((field, index) => {
			Object.keys(field).forEach(key => update(index, field[key]))
		})
	}, [languages, update])

	const onNext = async data => {
		try {
			console.log('Add lang Data: ', data)
		const res=	await updateCV({ id,...data })
		console.log(res)
			navigate(`/hardskills/${id}`)
		} catch (err) {
			return err
		}
	}
	return (
		<div>
			<h1 className={styles.title}>Languages</h1>
			{(isLoading || isFetching) && <p>Loading...</p>}
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onNext)}>
				<div className={styles.fieldArray}>
					{fields.map((field, index) => (
						<fieldset className={styles.fieldset} key={field.id}>
							<article className={styles.item}>
								<div className={styles.languageItem}>
									<Field
										autoFocus
										className={styles.input}
										name={`languages.${index}.language`}
										type='text'
										label='Language'
										defaultValue={languages?.[index]?.language}
										errors={errors?.languages}
										register={register}
									/>
									<Select
										name={`languages.${index}.level`}
										id='levels'
										label='Level'
										array={levels}
										errors={errors?.level}
										defaultValue={languages?.[index]?.level}
										register={register}
										rules={{
											required: 'Level is required'
										}}
										size='5'
									/>
								</div>
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
		</div>
	)
}
