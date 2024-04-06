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
	return value
}
