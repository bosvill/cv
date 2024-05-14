import { zodResolver } from '@hookform/resolvers/zod'
import styles from 'features/forms/ui/form.module.css'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCVQuery, useUpdateCVMutation } from 'shared/api'
import { Button, Field, Icon, IconButton } from 'shared/ui'
import { softskillsSchema } from '../model/formsSchema'

export const AddSoftskills = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
  const [updateCV] = useUpdateCVMutation()
  const navigate = useNavigate()

  const softskills = data?.cv?.softskills || []

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm({
    resolver: zodResolver(softskillsSchema),
    defaultValues: { softskills: [...softskills] }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'softskills'
  })

  const onSubmit = async data => {
    try {
      await updateCV({ id, data })
      navigate(`/cv/${id}/languages`)
    } catch (err) {
      return err
    }
  }

  const onAppend = () => {
    append({ skill: '' })
  }

  return (
    <>
      <h1 className={styles.title}>Soft Skills</h1>
      {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <p className={styles.error}>{error.data?.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldArray}>
          {fields.map((field, index) => (
            <fieldset className={styles.skillsFieldset} key={field.id}>
              <article className={styles.skillItem}>
                <Field
                  id='soft'
                  autoFocus
                  name={`softskills.${index}.skill`}
                  errors={errors?.softskills}
                  register={register}
                />
                <IconButton type='button' onClick={() => remove(index)}>
                  <Icon className={styles.svg} id='trash' />
                </IconButton>
              </article>
            </fieldset>
          ))}
          <div className={styles.buttons}>
            <Button type='button' onClick={onAppend}>
              Add
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Loading' : 'Next'}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
