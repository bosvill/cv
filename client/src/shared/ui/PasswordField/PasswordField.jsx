import { useState } from 'react'
import styles from './PasswordField.module.css'

export const PasswordField = ({ id, name, label, register, errors, rules, ...props }) => {
	const [visible, setVisible] = useState(false)
	const handleVisible = () => setVisible(!visible)
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
				<div className={styles.wrapper}>
					<input
						/* aria-invalid={errors ? "true" : "false"} */
						type={visible ? 'text' : 'password'}
						name={name}
						className={styles.input}
						aria-label={label}
						{...(register && register(name, rules))}
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
