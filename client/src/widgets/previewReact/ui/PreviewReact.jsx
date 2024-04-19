import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom'
import { useGetCVQuery } from 'shared/api/cv/cvApi'
import { Main, Sidebar } from 'entities/templateReact'
import styles from './previewReact.module.css'
import { Button } from 'shared/ui';

export const PreviewReact = () => {
	const { id } = useParams()
	const { data } = useGetCVQuery(id)
	const cv = data?.cv || {}

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: 'Resume',
		onAfterPrint: () => console.log('Printed PDF successfully!')
	})

	return (
		<>
			<div className={styles.container} ref={componentRef}>
				{data && (
					<>
						<Sidebar cv={cv} />
						<Main cv={cv} />
					</>
				)}
			</div>
			<Button type='button' onClick={handlePrint}>Print Pdf</Button>
		</>
	)
}
