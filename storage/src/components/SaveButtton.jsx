import style from '../styles/SaveButton.module.css'

const SaveButton = ({upload,img}) =>{
    return(
        <button className={style.button} onClick={()=>upload(img)}>
            Cadastrar
        </button>
    )
}


export default SaveButton