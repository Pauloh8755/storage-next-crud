import styles from '../styles/Main.module.css'
import Title from './Title'

const Main = (props)=>{
    return(
        <div className={styles.container}>
            <Title title={props.title}/>
            {props.children}
        </div>
    )
}

export default Main