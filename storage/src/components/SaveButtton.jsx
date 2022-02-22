import style from '../styles/SaveButton.module.css'

const SaveButton = ({onClick,edit}) =>{
    return(
        <button className={style.button} onClick={()=>onClick()}>
            {edit === true? "Atualizar": "Cadastrar"}
        </button>
    )
}


export default SaveButton