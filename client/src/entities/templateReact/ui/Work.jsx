import { v4 } from 'uuid'
import { showDate } from 'shared/lib'
import { Icon } from 'shared/ui'
import styles from './templateReact.module.css'

export const Work = ({ work }) => {
  return (
    <section className={styles.workSection}>
      <h4 className={styles.titleDarker}>Proffesional Experience</h4>
      <hr className={styles.line} />
      <ul className={styles.workList}>
        {work.map(el => (
          <li className={styles.workItem} key={el._id}>
            <p className={styles.date}>
              {showDate(el.start)} - {showDate(el.end)}
            </p>
            <h5 className={styles.item}>
              {el.position}, {el.company}
            </h5>
            <ul>
              {el.description.split('\n').map((d, i) => (
                <li key={v4()} className={styles.workDescription}>
                  <Icon id='react' className={styles.svgWork} />
                  {d}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
