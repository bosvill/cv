import { useState } from 'react'
import styles from './PasswordField.module.css'

export const PasswordField = ({ id, name, label, register, error,  ...props }) => {
	const [visible, setVisible] = useState(false)
	const handleVisible = () => setVisible(!visible)
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
				<div className={styles.wrapper}>
					<input
						aria-invalid={error ? "true" : "false"} 
						type={visible ? 'text' : 'password'}
						name={name}
						className={styles.input}
						aria-label={label}
						{...register(name)} 
						{...props}
					/>
					<svg className={styles.svg} onClick={handleVisible}>
						{visible ? (
							<use href={`/sprite.svg#eyeOpen`}></use>
						) : (
							<use href={`/sprite.svg#eyeNone`}></use>
						)}
					</svg>
				</div>
			</label>
		</div>
	)
}
