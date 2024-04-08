import { Icon } from 'shared/ui'
import styles from './templateReact.module.css'
import { showLevel } from 'shared/lib/level'
import { showMeter } from '../lib/showMeter'

export const Sidebar = ({ cv }) => {
	console.log(showMeter(5))

	return (
		<aside className={styles.aside}>
			<div className={styles.imgWrapper}>
				{cv.image && <img className={styles.img} src={`${cv.image.url}`} alt='' />}
			</div>
			<div>
				<h4 className={styles.react}>Details</h4>
				<address>
					<div className={styles.address}>
						<Icon className={styles.svg} id='home' />
						<p>
							{cv.street}, {cv.zip} {cv.city}
						</p>
					</div>
					<div className={styles.address}>
						<Icon className={styles.svg} id='envelope' />
						<a href={`mailto:${cv.email}`} target='_blank'>
							{cv.email}
						</a>
					</div>
					<div className={styles.address}>
						<Icon className={styles.svg} id='mobile' />
						<a href={`tel:${cv.phone}`} target='_blank'>
							{cv.phone}
						</a>
					</div>

					{cv.linkedIn ? (
						<div className={styles.address}>
							<Icon className={styles.svg} id='linkedIn' />
							<a href={` http://ca.linkedin.com/in/${cv.linkedIn}`} target='_blank'>
								{cv.linkedIn}
							</a>
						</div>
					) : null}

					{cv.github ? (
						<div className={styles.address}>
							<Icon className={styles.svg} id='github' />
							<a href={`https://github.com/${cv.github}`} target='_blank'>
								{cv.github}
							</a>
						</div>
					) : null}

					{cv.homepage ? (
						<div className={styles.address}>
							<Icon className={styles.svg} id='globe' />
							<a href={`${cv.homepage}`} target='_blank'>
								{cv.homepage}
							</a>
						</div>
					) : null}
				</address>
			</div>
			<div>
				<h4 className={styles.react}>Hardskills</h4>
				<ul>
					{cv?.hardskills
						? Object.values(cv?.hardskills).map(el => <li key={el._id}>{el.skill}</li>)
						: null}
				</ul>
			</div>
			<div>
				<h4 className={styles.react}>Softskills</h4>
				<ul>
					{cv?.softskills
						? Object.values(cv?.softskills).map(el => <li key={el._id}>{el.skill}</li>)
						: null}
				</ul>
			</div>
			<div>
				<h4 className={styles.react}>Languages</h4>
				<ul>
					{cv?.languages
						? cv?.languages.map(el => (
								<li key={el._id} className={styles.langItem}>
									<span>{el.language}</span>
									<span className={styles.bar}>
										{showMeter(showLevel(el.level)).map(e => (
											<div>
												<Icon id='react' className={styles.svgMeter} />
												
											</div>
										))}
									</span>
									{/* <meter
										className={styles.meter}
										title='Level'
										min='0'
										max='6'
										value={`${showLevel(el.level)}`}>
										{showLevel(el.level)}
									</meter> */}
								</li>
						  ))
						: null}
				</ul>
			</div>
		</aside>
	)
}
