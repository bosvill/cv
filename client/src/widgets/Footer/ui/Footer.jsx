import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
	const now= new Date()
    return (
        <footer className={styles.footer}>
			<ul className={styles.nav}>
				<li>
					<Link to=''> About</Link>
				</li>
				<li>
					<Link to=''> Tech Stack</Link>
				</li>
			</ul>
			<p className={styles.info}>Berlin © 2023-{now.getFullYear()}</p>
		</footer>
    );
}

export default Footer;
