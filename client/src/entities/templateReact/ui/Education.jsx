import { showDate } from 'shared/lib'
import styles from './templateReact.module.css'

export const Education = ({ education }) => {
  return (
    <section className={styles.workSection}>
      <h4 className={styles.titleDarker}>Education</h4>
      <hr className={styles.line} />
      <ul>
        {education.map(el => (
          <li className={styles.educationItem} key={el._id}>
            <p className={styles.date}>
              {showDate(el.start)} - {showDate(el.end)}
            </p>
            <h5 className={styles.item}>
              {el.degree} at {el.school}
            </h5>

            <p>
              {el.degree} {el.subject}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
