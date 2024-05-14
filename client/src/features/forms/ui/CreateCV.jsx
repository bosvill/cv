import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser, useCreateCVMutation } from 'shared/api'
import { Button, Radio } from 'shared/ui'
import styles from './form.module.css'

export const CreateCV = () => {
  const user = useSelector(selectUser)
  const [createCV, { isError, error, isLoading }] = useCreateCVMutation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const onSubmit = async data => {
    try {
      const result = await createCV({ user, ...data }).unwrap()
      console.log(result)
      const id = result?.cv?._id

      navigate(`/cv/${id}/profile`)
    } catch (err) {
      return err
    }
  }

  return (
    <>
      <h1 className={styles.title}>Let's build your CV</h1>
      {isError && <p className={styles.error}>{error.data?.message}</p>}
      {isLoading && <p>Loading...</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldArray}>
          <fieldset className={styles.fieldset}>
            <legend>Choose template</legend>
            <Radio
              name='template'
              label='Green'
              value='green'
              register={register}
            />
            <Radio
              name='template'
              label='React'
              value='react'
              register={register}
            />
          </fieldset>

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Loading' : 'Create'}
          </Button>
        </div>
      </form>
    </>
  )
}
