import style from "../styles/Dialog.module.css"

const Dialog = ({text,displayColor,color,status}) =>{
    const cardStyle ={
        backgroundColor:displayColor,
        color: color
    }
    return (
        <div className={style.container} style={cardStyle}>
            <div className={status?style.triangulo: style.trianguloErro}></div>
            <p className={style.text}>{text}</p>
        </div>
    )
}

export default Dialog