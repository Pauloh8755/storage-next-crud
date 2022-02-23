import {getDatabase, ref,set,get,child, update} from "firebase/database"
import { remove } from 'firebase/database'
import { deleteObject, getStorage, ref as refST} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';

//function para salvar dados no banco
const salvar = (title, url, name, setStatus) =>{
    const db = getDatabase()
    //retornando resolve
    const uuid = uuidv4()
    try{
      //set(local onde será salvo, objeto)
      set(ref(db, 'image/' + uuid),{
        //regatar id unico
        id:uuid,
        title: title,
        url: url,
        name: name
      })
      setStatus({display: true, message:"imagem cadastrada com sucesso", error: true})
    }catch(e){
      console.log(e)
      setStatus({display: true, message:"falha ao cadastrar Imagem"})
    }
}

const updateImage = (title, url, name, id,setStatus)=>{
  const db = getDatabase()
  const data ={
    id: id,
    name: name,
    title: title,
    url: url
  }
  try{
    const updates ={}
    updates[`image/${id}`] = data
    update(ref(db),updates)
    setStatus({display: true, message:"imagem atualizada com sucesso", error: true})
  }catch(e){
    console.log(e)
    setStatus({display: true, message:"falha ao atualizar Imagem"})
  }
}

const buscar = async() => {
  let data = []
  const dbRef = ref(getDatabase())
  const snapshot = await get(child(dbRef,"image/"))
  if(snapshot.exists()){
     for(let i in snapshot.val()){
       data.push({...snapshot.val()[i]})
     }
  }
  return data
}

const deleteFile = async(url) =>{
  const storage = getStorage()
  const imageRef = refST(storage, `${url}`)
  await deleteObject(imageRef)
}
const  deletar = async (id, url,setStatus) =>{
  const db = getDatabase()
  try{
    await remove(ref(db, 'image/' + id))
    deleteFile(url)
    setStatus({display: true, message: "Imagem deletada com sucesso", error: true})
  }catch(e){
    setStatus({display: true, message: "Falha ao deletar imagem"})
  }
}

export{
  salvar as default,
  buscar,
  deletar,
  updateImage
} 
