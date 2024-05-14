import { useParams, NavLink } from 'react-router-dom'
import { breadcrumbs } from '../lib/breadcrumbs'

import styles from './crumbs.module.css'
import { Icon } from 'shared/ui'

export const Breadcrumbs = () => {
	const { id } = useParams()
	let crumbs = breadcrumbs(id)
	

	return (
		<nav className={styles.container}>
			<ul className={styles.crumbs}>
				{crumbs.map(crumb => (
					<li key={crumb.step}>
						{crumb.step === 1 ? (
							<NavLink to={crumb.to} className={styles.fileLink}>
								<Icon className={styles.file} id='file' />
							</NavLink>
						) : (
							<NavLink to={crumb.to} className={styles.link}>
								<Icon className={styles.svg} id='chevronRight' />
								<span>{crumb.label}</span>
							</NavLink>
						)}
					</li>
				))}
			</ul>
		</nav>
	)
}

/*   const BreadCrumbs = ({ links }) => (
  <nav>
    <Link to="/">Home</Link>
    {Object.entries(props).map(([to, label]) => [
      ' / ',
      <Link to={to}>{label}</Link>
    ])}
  </nav>
);

<BreadCrumbs links={{ '/settings': "Settings" }} /> 

*/
