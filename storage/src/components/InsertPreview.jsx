import { useState, useEffect } from 'react'
import { buscar } from '../backend/imageController'
import style from '../styles/InsertPreview.module.css'
import Button from './Button'
import { EditIcon, TrashIcon } from './icons'
import Text from './Text'



const InsertPreview = ({status}) =>{
    const renderData = () => {
        const [data, setData] = useState([])
        useEffect(()=>{
            buscar().then(setData)
        },[status])
        console.log(data)
        return data.map((image, i)=>{
            return(
                <div key={i} className={style.container}>
                    <div className={style.preview}>
                        <Text text={image.title}/>
                        <div>
                            <Button>{EditIcon}</Button>
                            <Button type="delete">{TrashIcon}</Button>
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