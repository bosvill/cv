import { Breadcrumbs } from 'entities/breadcrumbs'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './layouts.module.css'

export const FormLayout = () => {
	return (
		<main className={styles.main}>
			 <Breadcrumbs/> 
			<Outlet />
		</main>
	)
}


