import styles from './templateReact.module.css'

export const Image = ({ image }) => {
  return (
    <div className={styles.imgWrapper}>
      {image && (
        <img className={styles.img} src={`${image.url}`} alt='User Image' />
      )}
      <hr className={styles.line} />
    </div>
  )
}
