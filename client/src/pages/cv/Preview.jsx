import { useNavigate, useParams } from 'react-router-dom'
import { useGetCVQuery } from 'src/shared/api'
import styles from 'src/pages/cv/preview.module.css'
import { showDate } from 'src/shared/lib'
import { Icon } from 'src/shared/ui'

const Preview = () => {
	const { id } = useParams()
	const { data, isLoading, isFetching, isError, error, isSuccess } = useGetCVQuery(id)
	const cv = data?.cv || {}
	console.log(data)

	if (isLoading || isFetching) <p>Loading...</p>

	if (isError) <p>{error?.data?.message}</p>

	return (
		<div className={styles.container}>
			{data && (
				<aside className={styles.aside}>
					<div className={styles.imgWrapper}>
						{data.cv.image && <img className={styles.img} src={`${cv.image.url}`} alt='' />}
					</div>
					<div>
						<h4>Details</h4>
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
						<h4>Hardskills</h4>
						<ul>
							{cv?.hardskills ? Object.values(cv?.hardskills).map(el => <li>{el.skill}</li>) : null}
						</ul>
					</div>
					<div>
						<h4>Softskills</h4>
						<ul>
							{cv?.softskills ? Object.values(cv?.softskills).map(el => <li>{el.skill}</li>) : null}
						</ul>
					</div>
				</aside>
			)}

			<main className={styles.main}>
				{data && (
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
				)}

				<section className={styles.workSection}>
					<h4 className={styles.title}>Proffesional Experience</h4>
					<ul className={styles.workList}>
						{data &&
							cv.work.map(el => (
								<li className={styles.workItem}>
									<p className={styles.date}>
										{showDate(el.start)} - {showDate(el.end)}
									</p>
									<h5 className={styles.react}>
										{el.position}, {el.company}
									</h5>

									<p>{el.description}</p>
								</li>
							))}
					</ul>
				</section>
				<section className={styles.workSection}>
					<h4 className={styles.title}>Education</h4>
					<ul>
						{data &&
							cv.education.map(el => (
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
		</div>
	)
}

export default Preview
