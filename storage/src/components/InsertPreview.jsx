import { useState, useEffect } from 'react'
import { buscar } from '../backend/imageController'
import style from '../styles/InsertPreview.module.css'
import Button from './Button'
import { EditIcon, TrashIcon } from './icons'
import Text from './Text'
import { deletar } from '../backend/imageController'



const InsertPreview = (props) =>{

    const renderData = () => {
        const [data, setData] = useState([])
        useEffect(()=>{
            buscar().then(setData)
        },[props.status])

        return data.map((image, i)=>{
            return(
                <div key={i} className={style.container}>
                    <div className={style.preview}>
                        <Text text={image.title}/>
                        <div>
                            <Button onClick={()=>props.edit(image.title, image.url)}>{EditIcon}</Button>
                            <Button type="delete" onClick={()=>deletar(image.id, image.url, props.delete)}>{TrashIcon}</Button>
                        </div>
                    </div>
                    <img className={style.imgPreview} src={image.url}></img>
                </div>
            )
        })
    }
    return(
        <>
            {renderData()}
        </>
    )
}

export default InsertPreview