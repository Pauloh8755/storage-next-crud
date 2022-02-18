import { useState } from 'react'
import styles from '../styles/InputText.module.css'

const InputText = ({text,setText, placeholder}) =>{
    return(
        <div>
            <input className={styles.text} type="text" placeholder={placeholder} 
                value={text} onChange={(e)=>{setText(e.target.value)}
            }/>
        </div>
    )
}

export default InputText