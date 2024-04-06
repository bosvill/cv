import styles from 'src/shared/ui/Icon/Icon.module.css'

const icons = ['enter', 'exit', 'eyeNone', 'eyeOpen', 'trash', 'menu']

export  const Icon = ({ id, ...props }) => {
	//className={`${styles.svg}`}
	return (
		<svg {...props}>
			<use href={`/sprite.svg#${id}`} />
		</svg>
	)
}


