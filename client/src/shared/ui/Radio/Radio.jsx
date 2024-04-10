
import styles from './Radio.module.css'

export const Radio = ({ name, value, label,register, ...props }) => {
	return (
		<div className={styles.formControl}>
			<label htmlFor={value} className={styles.label}>
				<input type='radio' name={name} value={value} {...register(name)} {...props} className={styles.input} />
				{label}
			</label>
		</div>
	)
}


