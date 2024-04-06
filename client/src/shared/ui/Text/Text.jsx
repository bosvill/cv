import styles from './Text.module.css'

export const Text = ({ id, name, label, register, errors, rules, ...props }) => {
	return (
		<div className={styles.formControl}>
			<label htmlFor={id} className={styles.label}>
				{errors ? (
					<span role='alert' className={styles.error}>
						{errors.message}
					</span>
				) : (
					label
				)}
				<textarea
					className={styles.text}
					name={name}
					aria-label={label}
					{...(register && register(name, rules))}
					//autoComplete='true'
					{...props}
					rows={3}></textarea>
			</label>
		</div>
	)
}
