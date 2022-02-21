
import style from '../styles/Button.module.css'




const Button = (props) =>{
   
    const color = props.type === 'delete'? style.delete : style.edit
    return(
        <button className={`${style.btn} ${color}`} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

//onClick={props.type === 'delete'?: false}>

export default Button