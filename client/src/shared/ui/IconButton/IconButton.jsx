import styles from './IconButton.module.css'
export const IconButton = ({ children, icon, ...props }) => {
	return (
		<button {...props} className={styles.btn} icon={icon}>
			{children}
		</button>
	)
}


