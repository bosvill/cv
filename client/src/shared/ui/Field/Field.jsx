import React from 'react'
import styles from './Field.module.css'

export const Field = ({ id, name, label, register, errors, rules, ...props }) => {
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

				<input
					 aria-invalid={errors?.name ? 'true' : 'false'} 
					name={name}
					className={styles.input}
					aria-label={label}
					{...(register && register(name, rules))}
					autoComplete='true'
					{...props}
				/>
			</label>
		</div>
	)
}
