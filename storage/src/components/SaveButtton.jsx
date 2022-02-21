import style from '../styles/SaveButton.module.css'

const SaveButton = ({onClick,img,edit}) =>{
    return(
        <button className={style.button} onClick={()=>onClick(img)}>
            {edit === true? "Atualizar": "Cadastrar"}
        </button>
    )
}


export default SaveButton