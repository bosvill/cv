import styles from './fallback.module.css'

export const Fallback = () => {
	return (
		<div className={styles.container}>
			<div className={styles.spinner}></div>
		</div>
	)
}
