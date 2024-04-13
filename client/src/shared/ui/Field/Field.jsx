import styles from './Field.module.css'

export const Field = ({ id, name, label, register, error, ...props }) => {
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

				<input
					aria-invalid={error?.name ? 'true' : 'false'}
					name={name}
					className={styles.input}
					aria-label={label}
					{...(props.type === 'number'
						? { ...register(name, { valueAsNumber: true }) }
						: { ...register(name) })}
					{...props}
					autoComplete='true'
				/>
			</label>
		</div>
	)
}
