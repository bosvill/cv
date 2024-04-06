import styles from './intro.module.css'


export const ProfileIntro = () => {
    return (
			<div className={styles.intro}>
				<h1 className={styles.title}>Professional Summary</h1>
				<p className={styles.details}>
					Add a wanted job title and a summary of relevant professional abilities, accomplishments,
					and personal qualities that make you the right candidate for the job.
				</p>
			</div>
		)
}

