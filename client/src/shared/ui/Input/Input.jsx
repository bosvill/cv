import React from 'react'
import styles from './Input.module.css'

export const Input = ({ id, name, label, register, errors, rules, ...props }) => {
	/* const errorMessages = errors.message
	console.log(errorMessages) */

	return (
		<div className={styles.formControl}>
			<label htmlFor={id} className={styles.label}>
				{errors ? (
					<span role='alert' className={styles.error}>
						{errors.message}
					</span>
				) : (
					{ label }
				)}
				<input
					className={styles.input}
					aria-invalid={errors.name ? 'true' : 'false'}
					name={name}
					aria-label={label}
					{...(register && register(name, rules))}
					autoComplete='true'
					{...props}
				/>
			</label>
		</div>
	)
}
