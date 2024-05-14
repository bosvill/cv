import { CreateCV } from 'features/forms'
import styles from './pages.module.css'

export const StartCvPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <CreateCV />
      </section>
    </div>
  )
}
