
import { AddCoverLetter } from 'features/forms'
import styles from './coverPages.module.css'

export const CoverLetterPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cover Letter</h1>
      <AddCoverLetter />
    </div>
  )
}
