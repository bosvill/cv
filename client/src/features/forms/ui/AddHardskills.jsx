import { zodResolver } from '@hookform/resolvers/zod'
import styles from 'features/forms/ui/form.module.css'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCVQuery, useUpdateCVMutation } from 'shared/api'
import { Button, Field, Icon, IconButton } from 'shared/ui'
import { hardskillsSchema } from '../model/formsSchema'

export const AddHardskills = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error, isFetching } = useGetCVQuery(id)
  const [updateCV] = useUpdateCVMutation()
  const navigate = useNavigate()

  const hardskills = data?.cv?.hardskills || []

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm({
    resolver: zodResolver(hardskillsSchema),
    defaultValues: { hardskills: [...hardskills] }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hardskills'
  })

  const onSubmit = async data => {
    try {
      await updateCV({ id, data })
      navigate(`/cv/${id}/softskills`)
    } catch (err) {
      return err
    }
  }

  const onAppend = () => {
    append({ skill: '' })
  }
  return (
    <>
      <h1 className={styles.title}>Hard Skills</h1>
      {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <p className={styles.error}>{error.data?.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldArray}>
          {fields.map((field, index) => (
            <fieldset className={styles.skillsFieldset} key={field.id}>
              <article className={styles.skillItem}>
                <Field
                  id='hard'
                  name={`hardskills.${index}.skill`}
                  /* defaultValue={hardskills?.[index]?.skill} */
                  error={errors?.hardskills}
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
