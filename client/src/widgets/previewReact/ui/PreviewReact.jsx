import { useParams } from 'react-router-dom'
import { useGetCVQuery } from 'shared/api/cv/cvApi'
import { Sidebar } from 'entities/templateReact'
import styles from './previewReact.module.css'

export const PreviewReact = () => {
	const { id } = useParams()
	const { data } = useGetCVQuery(id)
	const cv = data?.cv || {}
	return <div className={styles.container}>{data && <Sidebar cv={cv} />}</div>
}
