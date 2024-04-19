import { showDate } from 'src/shared/lib'
import { Icon } from 'src/shared/ui'
import styles from './templateReact.module.css'

export const Main = ({ cv }) => {
	return (
		<main className={styles.main}>
			<header className={styles.header}>
				<div className={styles.headerText}>
					<div className={styles.name}>
						<h1>
							{cv.firstName} {cv.lastName}
						</h1>
						<hr />
						<h6>{cv.position}</h6>
					</div>
					<div>
						{/* <h4 className={styles.title}>Profile</h4> */}
						<p className={styles.profile}>{cv.profile}</p>
					</div>
				</div>
			</header>

			<section className={styles.workSection}>
				<h4 className={styles.title}>Proffesional Experience</h4>
				<ul className={styles.workList}>
					{cv.work.map(el => (
						<li className={styles.workItem}>
							<p className={styles.date}>
								{showDate(el.start)} - {showDate(el.end)}
							</p>
							<h5 className={styles.react}>
								{el.position}, {el.company}
							</h5>
							<ul>

							{el.description.split('\n').map((d,i)=><li>{d[i]}</li>)}
							
							</ul>
						</li>
					))}
				</ul>
			</section>
			<section className={styles.workSection}>
				<h4 className={styles.title}>Education</h4>
				<ul>
					{cv.education.map(el => (
						<li className={styles.educationItem}>
							<p className={styles.date}>
								{showDate(el.start)} - {showDate(el.end)}
							</p>
							<h5 className={styles.react}>
								{el.degree} at {el.school}
							</h5>

							<p>
								{el.degree} {el.subject}
							</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	)
}
