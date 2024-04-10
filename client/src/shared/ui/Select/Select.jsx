import { v4 } from 'uuid'
import styles from './Select.module.css'

export const Select = ({ id, name, defaultValue, register, options, label, ...props }) => {
	return (
		<div className={styles.content}>
			<label htmlFor={id} className={styles.label}>
				{label}
				<select className={styles.select} size='5' id={id} name={name} {...register(name)}>
					{options?.map(el => (
						<option
							key={v4()}
							value={el}
							className={styles.option}
							/* selected={el === defaultValue ? true : false} */>
							{el}
						</option>
					))}
				</select>
			</label>
		</div>
	)
}
