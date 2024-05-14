const levels = [
	['A1', 'A2', 'Working knoweledge'],
	['B1', 'Good working knoweledge'],
	['B2', 'Very good command'],
	['C1', 'Highly proficient'],
	['C2', 'Native speaker']
]

export const showLevel = level => {
	let value
	levels.filter((el, i) => (el.includes(level) ? (value = i + 1) : null))
	return value
}
