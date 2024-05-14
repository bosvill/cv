import styles from './templateReact.module.css'

export const Softskills = ({ softskills }) => {
  return (
    <div>
      <h4 className={styles.title}>Softskills</h4>
      <ul>
        {softskills
          ? Object.values(softskills).map(el => (
              <li key={el._id}>{el.skill}</li>
            ))
          : null}
      </ul>
    </div>
  )
}
