const levels = [
	['A1', 'A2', 'Working knoweledge', 'Elementary Proficiency'],
	['B1', 'Good working knoweledge', 'Limited Working Proficiency'],
	['B2', 'Very good command', 'Minimum Professional Proficiency'],
	['C1', 'Highly proficient', 'Full Professional Proficiency'],
	['C2', 'Native speaker', 'Native or Bilingual Proficiency']
]

export const showLevel = level => {
	let value
	levels.filter((el, i) => (el.includes(level) ? (value = i + 1) : null))
	return [...Array(value).keys()].map(i => i + 1)
}

//export const showMeter = num => [...Array(num).keys()].map(i => i + 1)


	/* <div>
			<h4 className={styles.title}>Languages</h4>
			<ul>
				{languages
					? languages?.map(el => (
							<li key={el._id} className={styles.langItem}>
								<div>{el.language}</div>
							</li>
					  ))
					: null}
			</ul>
			<ul>
				{languages
					? languages.map(el => (
							<li className={styles.bar}>
								{showLevel(el.level).map(e => (
									<span key={v4()}>
										<Icon id='react' className={styles.svgMeter} />
									</span>
								))}
							</li>
					  ))
					: null}
			</ul>
		</div> */

