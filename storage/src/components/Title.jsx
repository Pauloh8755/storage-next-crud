import styles from '../styles/Title.module.css'

const Title = (props)=>{
    return(
        <div>
            <h1 className={styles.title}>{props.title}</h1>
            <div className={styles.line}></div>
        </div>
    )
}

export default Title