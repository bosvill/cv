import styles from './imageUploader.module.css'
import { Icon } from '../Icon/Icon'

export const ImageField = ({ name, label, register, error, img,style, ...props }) => {
	return (
		<div className={styles.formControl}>
			{error ? (
				<span role='alert' className={styles.error}>
					{error.message}
				</span>
			) : null}

			<label htmlFor='imageUpload' style={style} className={styles.preview}>
				{img === undefined ? (
					<Icon id='person' className={styles.person} />
				) : (
					<div
						style={{ background: `no-repeat contain center/100% url(${img.url})` }}
						className={styles.img}></div>
				)}

				<input
					style={{ display: 'none' }}
					id='imageUpload'
					aria-label='Image file input'
					type='file'
					accept='image/png, image/jpeg, image/jpg, image/webp'
					name={name}
					{...register(name)}
					{...props}
				/>

				<span> {label}</span>
			</label>
		</div>
	)
}
