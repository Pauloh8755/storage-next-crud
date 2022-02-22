import InputImage from '../components/InputImage'
import InputText from '../components/InputText'
import InsertPreview from '../components/InsertPreview'
import Main from '../components/Main'
import SaveButton from '../components/SaveButtton'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { plus } from '../components/icons'
import {storage} from "../backend/config"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import salvar from '../backend/imageController'
import Dialog from '../components/Dialog'
import { v4 as uuidv4 } from 'uuid';
import { updateImage } from '../backend/imageController'

export default function Home() {
  
  const [img, setImg] = useState(plus)
  const [nameImage, setNameImage] = useState("")
  const [id, setId] = useState("")
  const [text, setText] = useState("")
  const [edit, setEdit] = useState(false)
  const [status, setStatus] = useState({display: false, message: "", error: false})

  const clearField = () =>{
    setText("")
    setImg(plus)
  }

  useEffect(()=>{
    const id = setTimeout(()=>{
      setStatus({display: false})
    }, 3000)
    return ()=>clearTimeout(id)
  }, [status.display])

  const fillInputs = ({title, url, name,id}) =>{
    setId(id)
    setText(title)
    setImg(url)
    setNameImage(name)
    
    setEdit(true)
  }

  const extensionFilter = ({name}) =>{
    const lastDot = name.lastIndexOf(".");
    return name.substring(lastDot, name.length)
  }
  const uploadImage = async (img) =>{
    const extension = extensionFilter(img)
    const name = `${uuidv4()}${extension}`
    //recebendo referencia(local onde será salvo/nome do arquivo)
    const storageRef = ref(storage, `/files/${name}`)
    //realizando upload
    await uploadBytesResumable(storageRef, img)
    //recebendo url para acessar arquivo
    const imgUrl = await getDownloadURL(ref(storage, `/files/${name}`))
    console.log(name,imgUrl)
    return {
      name: name,
      url: imgUrl
    }
  }
  //function de upload da imagem para o storage
  const handlerUpdate = async () =>{
    if(typeof img =="object"){
      const {name,url}= uploadImage(img)
      console.log(url)
      setNameImage(name)
      setImg(url)
    }
    console.log(img)
      updateImage(text,img,nameImage,id,setStatus)
  }

  const handlerInsert = async () =>{
    const {name,url} = await uploadImage(img)
    salvar(text,url,name,setStatus)
    
    clearField()
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        {status.display?
          <Dialog text={status.message}
            displayColor={status.error?"#95e8b0": "#e6a9a9"}
            color={status.error?"#11873c": "#9c3636"}
            status={status.error}
          />
        :false}
        <InsertPreview status={status.display} edit={fillInputs} delete={setStatus}/>
    
      </div>
      <div className={styles.back}>
        <Main title="Cadastro de Imagens">
            <InputText text={text} setText={setText} placeholder="Digite o nome da imagem"/>
            <InputImage img={img} setImg={setImg}/>
            <SaveButton  onClick={edit? handlerUpdate :handlerInsert} edit={edit}/>
        </Main>
      </div>
    </div>
  )
}
