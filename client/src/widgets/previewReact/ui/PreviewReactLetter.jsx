import { Details, Letter } from 'entities/templateReact'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { useGetCVQuery } from 'shared/api/cv/cvApi'
import { Button } from 'shared/ui'
import styles from './previewReact.module.css'

export const PreviewReactLetter = () => {
  const { id } = useParams()
  const { data, isFetching, isLoading, isError, error } = useGetCVQuery(id)
  const cv = data?.cv || {}
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Cover Letter ${cv?.fullname}`
  })
  return (
    <div className={styles.container}>
      {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <p className={styles.error}>{error.data?.message}</p>}
      <div className={styles.print} ref={componentRef}>
        {cv && (
          <>
            <aside className={styles.aside}>
              <Details
                street={cv.street}
                zip={cv.zip}
                city={cv.city}
                phone={cv.phone}
                email={cv.email}
              />
            </aside>
            <div className={styles.main}>
              <Letter letter={cv.letter} position={cv.position} />
            </div>
          </>
        )}
      </div>
      <div className={styles.printBtn}>
        <Button
          type='button'
          aria-label='Print pdf document'
          onClick={handlePrint}>
          Print Pdf
        </Button>
      </div>
    </div>
  )
}
