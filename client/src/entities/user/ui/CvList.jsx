import { Link } from 'react-router-dom'
import { useDeleteCVMutation, useGetAllQuery } from 'shared/api'
import { Icon, IconButton } from 'shared/ui'
import styles from './user.module.css'

export const CvList = ({ user }) => {
  const { data, isLoading, isFetching, isError, error } = useGetAllQuery(user)
  const [deleteCv] = useDeleteCVMutation()

  const handleDelete = async id => {
    await deleteCv(id)
  }
  const displayDate = date => {
    return new Date(date).toDateString()
  }
  return (
    <div className={styles.container}>
      {(isFetching || isLoading) && <p className={styles.msg}>Loading...</p>}
      {isError && <p className={styles.error}>{error?.data?.message}</p>}
      <ul className={styles.cardsContainer}>
        {data?.cvs?.map(cv => (
          <li key={cv._id} className={styles.card}>
            <h3>{cv?.cvTitle}</h3>
            <p className={styles.created}>
              Created at {displayDate(cv.createdAt)}
            </p>

            <div className={styles.btns}>
              <Link className={styles.link} to={`/cv/${cv._id}/template`}>
                <Icon id='pensil2' title='Edit' className={styles.svg} />
              </Link>
              <Link className={styles.link} to={`/cv/${cv._id}/preview`}>
                <Icon
                  id='download'
                  title='Preview and Download'
                  className={styles.svg}
                />
              </Link>
              <IconButton onClick={() => handleDelete(cv._id)}>
                <Icon id='trash' title='Delete' className={styles.svg} />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

