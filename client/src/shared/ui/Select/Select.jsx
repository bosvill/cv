import { v4 } from 'uuid'
import styles from './Select.module.css'

export const Select = ({ id, name, defaultValue, register, options, label,error, ...props }) => {
	return (
		<div className={styles.content}>
			<label htmlFor={id} className={styles.label}>
				{error ? (
					<span role='alert' className={styles.error}>
						{error.message}
					</span>
				) : (
					label
				)}
				<select className={styles.select} size='5' id={id} name={name} {...register(name)}>
					{options?.map(el => (
						<option key={el} value={el} className={styles.option}>
							{el}
						</option>
					))}
				</select>
			</label>
		</div>
	)
}
