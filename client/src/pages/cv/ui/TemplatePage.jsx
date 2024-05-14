import { ChangeTemplate } from 'features/forms'
import styles from './pages.module.css'

export const TemplatePage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <ChangeTemplate />
      </section>
    </div>
  )
}
