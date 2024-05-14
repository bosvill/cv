import {
  Details,
  Education,
  Hardskills,
  Header,
  Image,
  Languages,
  Softskills,
  Work
} from 'entities/templateReact'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { useGetCVQuery } from 'shared/api/cv/cvApi'
import { Button } from 'shared/ui'
import styles from './previewReact.module.css'

export const PreviewReact = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useGetCVQuery(id)
  const cv = data?.cv || {}

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: cv?.cvTitle
  })

  return (
    <div className={styles.container}>
      <div className={styles.print} ref={componentRef}>
        {data && (
          <>
            <aside className={styles.aside}>
              <Image image={cv.image} />

              <Details
                street={cv.street}
                zip={cv.zip}
                city={cv.city}
                phone={cv.phone}
                email={cv.email}
                github={cv.github}
                linkedIn={cv.linkedIn}
                homepage={cv.homepage}
              />
              <Hardskills hardskills={cv.hardskills} />
              <Softskills softskills={cv.softskills} />
              <Languages languages={cv.languages} />
            </aside>
            <div className={styles.main}>
              <Header
                fullname={cv.fullname}
                position={cv.position}
                profile={cv.profile}
              />

              <Work work={cv.work} />
              <Education education={cv.education} />
            </div>
          </>
        )}
      </div>
      <div className={styles.printBtn}>
        <Button type='button' onClick={() => navigate(`/cover/${id}`)}>
          Add Cover Letter
        </Button>
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
