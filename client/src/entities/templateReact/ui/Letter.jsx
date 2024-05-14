import { showTodayDate } from 'shared/lib/settings'
import styles from './templateReact.module.css'

export const Letter = ({ letter, position }) => {
  const today = showTodayDate()

  return (
    <div className={styles.letterContainer}>
      <div className={styles.companyAddress}>
        <p>{letter?.companyName}</p>
        <p>{letter.companyStreet}</p>
        <p>
          {letter.companyZip}, {letter.companyCity}
        </p>
      </div>
      <div className={styles.letterDate}>{today}</div>
      <div className={styles.letterTitle}>
        <p>Application as {position}</p>
        <p>{letter.refNumber ? `Reference ${letter.refNumber}` : null}</p>
      </div>
      <div className={styles.letterGreeting}>
        <p>{`Dear Mr. ${letter.hrLast},`}</p>
      </div>
      <div>
        <p>{letter.content}</p>
      </div>
    </div>
  )
}
