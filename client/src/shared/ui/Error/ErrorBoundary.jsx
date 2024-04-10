import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import styles from './error.module.css'

export const ErrorBoundary = () => {
	const error = useRouteError()

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<div>
					<h1>404</h1>
					<p>This page doesn't exist!</p>
				</div>
			)
		}

		if (error.status === 401) {
			return <div>You aren't authorized to see this</div>
		}

		if (error.status === 503) {
			return <div>Looks like our API is down</div>
		}

		if (error.status === 418) {
			return <div>🫖</div>
		}
	}
	return (
		<div className={styles.container}>
			<h3 className={styles.errMsg}>Oops.. Something went wrong</h3>
			<h3>
				{error.status}
				{error.message}
			</h3>
		</div>
	)
}


