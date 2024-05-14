import { Icon } from 'shared/ui'
import styles from './templateReact.module.css'

export const Details = ({
  street,
  zip,
  city,
  phone,
  email,
  linkedIn,
  github,
  homepage
}) => {
  return (
    <div>
      <h4 className={styles.title}>Details</h4>
      <address className={styles.details}>
        <div className={styles.address}>
          <Icon className={styles.svg} id='home' />
          <a
            className={styles.addressLink}
            href={`https://www.google.com/search?q=${street}+${zip}+${city}`}
            target='_blank'>
            <p>{street}</p>
            <p>
              {zip} {city}
            </p>
          </a>
        </div>
        <div className={styles.address}>
          <Icon className={styles.svg} id='envelope' />
          <a href={`mailto:${email}`} target='_blank'>
            {email}
          </a>
        </div>
        <div className={styles.address}>
          <Icon className={styles.svg} id='mobile' />
          <a href={`tel:${phone}`} target='_blank'>
            {phone}
          </a>
        </div>

        {linkedIn ? (
          <div className={styles.address}>
            <Icon className={styles.svg} id='linkedIn' />
            <a href={`http://ca.linkedin.com/in/${linkedIn}`} target='_blank'>
              {linkedIn}
            </a>
          </div>
        ) : null}

        {github ? (
          <div className={styles.address}>
            <Icon className={styles.svg} id='github' />
            <a href={`https://github.com/${github}`} target='_blank'>
              {github}
            </a>
          </div>
        ) : null}

        {homepage ? (
          <div className={styles.address}>
            <Icon className={styles.svg} id='globe' />
            <a href={`${homepage}`} target='_blank'>
              {homepage}
            </a>
          </div>
        ) : null}
      </address>
    </div>
  )
}
