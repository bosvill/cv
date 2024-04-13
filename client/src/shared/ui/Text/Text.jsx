import styles from './Text.module.css'

export const Text = ({ id, name, label, register, error, ...props }) => {
	return (
		<div className={styles.formControl}>
			<label htmlFor={id} className={styles.label}>
				{error ? (
					<span role='alert' className={styles.error}>
						{error.message}
					</span>
				) : (
					label
				)}
				<textarea
					className={styles.text}
					name={name}
					aria-label={label}
					{...register(name)}
					//autoComplete='true'
					{...props}
					rows={7}></textarea>
			</label>
		</div>
	)
}
