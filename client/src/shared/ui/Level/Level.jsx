import React from 'react'
import { v4 } from 'uuid'
import styles from './Level.module.css'

const levels=['A1','A2','B1','B2','C1','C2','Working knoweledge','Good working knoweledge','Very good command','Highly proficient','Native speaker', 'Elementary Proficiency','Limited Working Proficiency','Minimum Professional Proficiency','Full Professional Proficiency','Native or Bilingual Proficiency']

const Level = ({ name, rules, register, ...props }) => {
	return (
		<div className={styles.content}>
			 <label htmlFor='Level' className={styles.label}>
				Level
			</label> 
			<select name='level' className={styles.select} {...register && register('level', rules)}>
				 <option value="" className={styles.default}>Select Level</option> 
				{levels.length
					? levels.map(el => (
							<option key={v4()} value={el} className={styles.option}>
								{el}
							</option>
					  ))
					: null}
			</select>
		</div>
	)
}

export default Level