import { async } from "@firebase/util";
import {getDatabase, ref,set,get,child} from "firebase/database"
import { remove } from 'firebase/database'
import { deleteObject, getStorage, ref as refST} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';

//function para salvar dados no banco
const salvar = (title, url, name) =>{
    const db = getDatabase()
    //retornando resolve
    return new Promise((resolve)=>{
      const uuid = uuidv4()
      //set(local onde será salvo, objeto)
      set(ref(db, 'image/' + uuid),{
        //regatar id unico
        id:uuid,
        title: title,
        url: url,
        name: name
      }).then(()=>{
        resolve(true)
      }).catch((error)=>{
        console.log(error)  
        resolve(false)
      })
    })
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
  console.log(url)
  const storage = getStorage()
  const imageRef = refST(storage, `${url}`)
  await deleteObject(imageRef)
}
const  deletar = async (id, url,setStatus) =>{
  const db = getDatabase()
  try{
    await remove(ref(db, 'image/' + id))
    deleteFile(url)
    setStatus({display: true, message: "Imagem deletada com sucesso"})
  }catch(e){
    setStatus({display: true, message: "Falha ao deletar imagem"})
  }
}

export{
  salvar as default,
  buscar,
  deletar
} 
