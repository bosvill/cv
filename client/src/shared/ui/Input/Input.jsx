
import styles from './Input.module.css'

export const Input = ({ id, name, label, register, error,  ...props }) => {

	return (
		<div className={styles.formControl}>
			<label htmlFor={id} className={styles.label}>
				{error ? (
					<span role='alert' className={styles.error}>
						{error.message}
					</span>
				) : (
					{ label }
				)}
				<input
					className={styles.input}
					aria-invalid={error.name ? 'true' : 'false'}
					name={name}
					aria-label={label}
					{...register(name)}
					autoComplete='true'
					{...props}
				/>
			</label>
		</div>
	)
}
