import { zodResolver } from '@hookform/resolvers/zod'
import styles from 'features/forms/ui/form.module.css'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useGetCVQuery, useUpdateCVMutation } from 'shared/api'
import { Button, Field, Icon, IconButton, Text } from 'shared/ui'
import { workSchema } from '../model/formsSchema'

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
  } = useForm({
    defaultValues: { work: [...work] },
    resolver: zodResolver(workSchema)
  })

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
          {fields.map((field, index) => (
            <fieldset key={field?.id} className={styles.fieldset}>
              {index === activeIndex ? (
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
                      disabled={watch(`work.${index}.present`) === true}
                      register={register}
                      defaultValue={work?.[index]?.end}
                    />
                    <div className={styles.check}>
                      <input
                        type='checkbox'
                        {...register(`work.${index}.present`)}
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
              ) : (
                <article className={styles.collapsed} key={field?._id}>
                  <p>
                    {fields?.[index]?.position} at {fields?.[index]?.company}
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
                    <Icon
                      className={styles.svg}
                      id='chevronDown'
                      title='Show'
                    />
                  </IconButton>
                )}

                <IconButton onClick={() => remove(index)}>
                  <Icon className={styles.svg} id='trash' title='Delete' />
                </IconButton>
              </div>
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
