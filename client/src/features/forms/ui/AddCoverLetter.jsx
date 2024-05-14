import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setLetter, useGetCVQuery, useUpdateCVMutation } from 'shared/api'
import { Button, Field, Text } from 'shared/ui'
import { letterSchema } from '../model/letterSchema'
import styles from './form.module.css'

export const AddCoverLetter = () => {
  const { id } = useParams()
  //const letter = useSelector(selectLetter)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isFetching, isLoading, isError, error } = useGetCVQuery(id)
  const [updateCV] = useUpdateCVMutation()
  const { letter } = data.cv || {}
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(letterSchema),
    defaultValues: letter
  })

  useEffect(() => {
    reset()
  }, [reset, data])

  const onSubmit = async data => {
    console.log('Letter: ', data)
    try {
      dispatch(setLetter(data))
      await updateCV({ id, letter: data })
      navigate(`/cover/${id}/preview`)
    } catch (err) {
      return err
    }
  }

  return (
    <>
      {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <p className={styles.error}>{error.data?.message}</p>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Application Details</legend>
          <div className={styles.item}>
            <Field
              autoFocus
              id='hrname'
              name='hrLast'
              label='HR Last Name'
              error={errors?.hrLast}
              register={register}
            />
            <Field
              id='ref#'
              name='refNumber'
              label='Reference'
              error={errors?.refNumber}
              register={register}
            />
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Company Details</legend>
          <div className={styles.companyItem}>
            <div className={styles.company}>
              <Field
                id='company'
                name='companyName'
                label='Name'
                error={errors?.companyName}
                register={register}
              />
            </div>
            <div className={styles.street}>
              <Field
                id='companyStr'
                name='companyStreet'
                label='Street'
                error={errors?.companyStreet}
                register={register}
              />
            </div>
            <Field
              type='number'
              id='companyZIP'
              name='companyZip'
              label='Postal Code'
              error={errors?.companyZip}
              register={register}
            />
            <Field
              id='companyCITY'
              name='companyCity'
              label='City'
              error={errors?.companyCity}
              register={register}
            />
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Letter</legend>
          <Text
            id='letter'
            name='content'
            label='Letter text'
            error={errors?.content}
            register={register}
          />
        </fieldset>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Loading' : 'Create Cover Letter'}
        </Button>
      </form>
    </>
  )
}
