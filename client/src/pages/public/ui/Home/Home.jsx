import styles from './public.module.css'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
			<div className={styles.homeWrapper}>
				<main className={styles.main}>
					<div>
						<h1 className={styles.heading}>Best Free CV Builder</h1>
						<p className={styles.subHeading}>Make a stand out CV in no time</p>
					</div>
                    <Link className={styles.cta} to={'/cv'}>Create</Link>
				</main>
			</div>
		)
}

export default Home;
