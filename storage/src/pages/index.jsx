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

export default function Home() {
  
  const [img, setImg] = useState(plus)
  const [text, setText] = useState("")
  const [edit, setEdit] = useState(false)
  const [status, setStatus] = useState({display: false, message: false})

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

  const fillInputs = (title, url) =>{
    setText(title)
    setImg(url)
    setEdit(true)
  }

  const extensionFilter = ({name}) =>{
    const lastDot = name.lastIndexOf(".");
    return name.substring(lastDot, name.length)
  }

  //function de upload da imagem para o storage
  const uploadImage = async (img) =>{
    const extension = extensionFilter(img)
    const name = `${uuidv4()}${extension}`
    //recebendo referencia(local onde será salvo/nome do arquivo)
    const storageRef = ref(storage, `/files/${name}`)
    //realizando upload
    await uploadBytesResumable(storageRef, img)
    //recebendo url para acessar arquivo
    const url = await getDownloadURL(ref(storage, `/files/${name}`))
    //chamando função para salvar dados no banco
    setStatus({display: true, message: await salvar(text,url,name) === true? "imagem cadastrada com sucesso": "falha ao cadastrar Imagem"})
    clearField()
  }
  const updateImage = () =>{
return false
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        {status.display?
          <Dialog text={status.message}
            displayColor={status.message?"#95e8b0": "#e6a9a9"}
            color={status.message?"#11873c": "#9c3636"}
            status={status.message}
          />
        :false}
        <InsertPreview status={status.display} edit={fillInputs} delete={setStatus}/>
    
      </div>
      <div className={styles.back}>
        <Main title="Cadastro de Imagens">
            <InputText text={text} setText={setText} placeholder="Digite o nome da imagem"/>
            <InputImage img={img} setImg={setImg}/>
            <SaveButton img={img}  onClick={edit? updateImage :uploadImage} edit={edit}/>
        </Main>
      </div>
    </div>
  )
}
