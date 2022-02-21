import styles from '../styles/InputImage.module.css'
import { plus } from '../components/icons'

const InputImage = ({img, setImg}) =>{
    return(
        <div>
            <input className={styles.fileImage} id="file-img" type="file" name="imageFile" onChange={e=> setImg(e.target.files[0])}/>
            <label htmlFor="file-img">
                <div className={img === plus?styles.plusImage: styles.labelImage}>
                    {img === plus? plus : <img className={styles.image} src={typeof img === "object"?URL.createObjectURL(img): img} alt="imagem"/>}
                </div>
            </label>
        </div>
    )
}
export default InputImage