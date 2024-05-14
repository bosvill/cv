import styles from './templateReact.module.css'

export const Header = ({ fullname, position, profile }) => {
  return (
    <header>
      <div className={styles.header}>
        <article className={styles.headerTitle}>
          <h1 className={styles.name}>
            {fullname}
          </h1>
          <hr className={styles.line} />
          <h6 className={styles.position}>{position}</h6>
        </article>
        <article>
          <p className={styles.profile}>{profile}</p>
        </article>
      </div>
    </header>
  )
}
