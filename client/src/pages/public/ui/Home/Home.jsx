import styles from './public.module.css'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
				<main className={styles.main}>
			<div className={styles.container}>
					<div>
						<h1 className={styles.heading}>Best Free CV Builder</h1>
						<p className={styles.subHeading}>Make a stand out CV in no time</p>
					</div>
                    <Link className={styles.cta} to={'/cv'}>Create</Link>
			</div>
				</main>
		)
}

export default Home;
