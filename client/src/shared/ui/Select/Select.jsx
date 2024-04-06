import { v4 } from 'uuid'
import styles from './Select.module.css'

export const Select = ({ id, name, defaultValue, rules, register, array, label, ...props }) => {
	return (
		<div className={styles.content}>
			<label htmlFor={id} className={styles.label}>
				{label}
				<select
					className={styles.select}
					id={id}
					name={name}
					{...(register && register(name, rules))}>
					{array.length
						? array.map(el => (
								<option
									key={v4()}
									value={el}
									className={styles.option}
									selected={el === defaultValue ? true : false}>
									{el}
								</option>
						  ))
						: null}
				</select>
			</label>
		</div>
	)
}
