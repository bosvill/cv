import { v4 } from 'uuid'
import { Icon } from 'shared/ui'
import { showLevel } from '../lib/showMeter'

import styles from './templateReact.module.css'

export const Languages = ({ languages }) => {
  return (
    <div>
      <h4 className={styles.title}>Languages</h4>
      <ul>
        {languages.map(el => (
          <li key={el._id} className={styles.langItem}>
            <div className={styles.language}>{el.language}</div>
            <div className={styles.level}>
              {showLevel(el.level).map(e => (
                <Icon id='react' className={styles.svgMeter} key={v4()} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
