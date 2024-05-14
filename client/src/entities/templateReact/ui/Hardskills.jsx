import styles from './templateReact.module.css'

export const Hardskills = ({hardskills}) => {
return <div>
<h4 className={styles.title}>Hardskills</h4>
<ul>
  {hardskills
    ? Object.values(hardskills).map(el => (
        <li key={el._id}>{el.skill}</li>
      ))
    : null}
</ul>
</div>
}



