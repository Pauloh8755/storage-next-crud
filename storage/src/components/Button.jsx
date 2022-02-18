import style from '../styles/Button.module.css'

const Button = props =>{
    const color = props.type === 'delete'? style.delete : style.edit
    return(
        <button className={`${style.btn} ${color}`}>
            {props.children}
        </button>
    )
}

export default Button