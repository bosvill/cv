import styles from './IconButton.module.css'
export const IconButton = ({ children, icon, ...props }) => {
	return (
		<button type='button' {...props} className={styles.btn} icon={icon}>
			{children}
		</button>
	)
}
